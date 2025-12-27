-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for rewards updated_at
DROP TRIGGER IF EXISTS update_rewards_updated_at ON public.rewards;
CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create profile, rewards, and handle referrals
CREATE OR REPLACE FUNCTION public.create_profile_for_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_referrer_id UUID;
  v_referral_code TEXT;
BEGIN
  -- Generate unique referral code
  v_referral_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NEW.id::TEXT) FROM 1 FOR 8));

  -- Create profile with referral code
  INSERT INTO public.profiles (id, email, name, referral_code, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name',
    v_referral_code,
    'user'
  );

  -- Create rewards record for new user
  INSERT INTO public.rewards (user_id, total_points, current_streak)
  VALUES (NEW.id, 0, 0);

  -- Handle referral if signup included referral code
  IF NEW.raw_user_meta_data->>'referral_code' IS NOT NULL THEN
    -- Find the referrer by their referral code
    SELECT id INTO v_referrer_id
    FROM public.profiles
    WHERE referral_code = NEW.raw_user_meta_data->>'referral_code';

    -- If valid referrer found
    IF v_referrer_id IS NOT NULL THEN
      -- Create referral record
      INSERT INTO public.referrals (referrer_id, referred_id, points_awarded)
      VALUES (v_referrer_id, NEW.id, TRUE);

      -- Award 25 points to referrer
      UPDATE public.rewards
      SET total_points = total_points + 25
      WHERE user_id = v_referrer_id;

      -- Log the transaction for referrer
      INSERT INTO public.point_transactions (user_id, points, transaction_type, description)
      VALUES (v_referrer_id, 25, 'referral', 'Referral bonus for inviting new user');
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger for auth user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_for_user();

-- Function for daily check-in
CREATE OR REPLACE FUNCTION public.handle_daily_checkin(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_rewards RECORD;
  v_new_streak INTEGER;
  v_points_earned INTEGER := 5;
  v_last_checkin DATE;
  v_today DATE := CURRENT_DATE;
BEGIN
  SELECT * INTO v_rewards FROM public.rewards WHERE user_id = p_user_id;
  
  IF v_rewards IS NULL THEN
    INSERT INTO public.rewards (user_id, total_points, current_streak, last_check_in)
    VALUES (p_user_id, v_points_earned, 1, NOW())
    RETURNING * INTO v_rewards;
    
    INSERT INTO public.point_transactions (user_id, points, transaction_type, description)
    VALUES (p_user_id, v_points_earned, 'daily_checkin', 'Daily check-in streak: 1');
    
    RETURN json_build_object(
      'success', true,
      'points_earned', v_points_earned,
      'new_total', v_points_earned,
      'new_streak', 1,
      'message', 'First check-in! Welcome!'
    );
  END IF;
  
  v_last_checkin := DATE(v_rewards.last_check_in);
  
  IF v_last_checkin = v_today THEN
    RETURN json_build_object('success', false, 'message', 'Already claimed today');
  END IF;
  
  IF v_last_checkin = v_today - INTERVAL '1 day' THEN
    v_new_streak := v_rewards.current_streak + 1;
  ELSE
    v_new_streak := 1;
  END IF;
  
  UPDATE public.rewards
  SET 
    total_points = total_points + v_points_earned,
    current_streak = v_new_streak,
    last_check_in = NOW()
  WHERE user_id = p_user_id;
  
  INSERT INTO public.point_transactions (user_id, points, transaction_type, description)
  VALUES (p_user_id, v_points_earned, 'daily_checkin', 'Daily check-in streak: ' || v_new_streak);
  
  RETURN json_build_object(
    'success', true,
    'points_earned', v_points_earned,
    'new_total', v_rewards.total_points + v_points_earned,
    'new_streak', v_new_streak,
    'message', 'Check-in successful!'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment rewards points
CREATE OR REPLACE FUNCTION public.increment_rewards_points(uid UUID, pts INT)
RETURNS void AS $$
BEGIN
  UPDATE public.rewards
  SET total_points = total_points + pts
  WHERE user_id = uid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to redeem rewards
CREATE OR REPLACE FUNCTION public.redeem_reward(
  p_user_id UUID,
  p_reward_id UUID,
  p_redemption_details JSONB DEFAULT '{}'::jsonb
)
RETURNS JSON AS $$
DECLARE
  v_reward RECORD;
  v_user_points INTEGER;
  v_already_redeemed BOOLEAN;
BEGIN
  SELECT * INTO v_reward FROM public.rewards_catalog WHERE id = p_reward_id;
  
  IF v_reward IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Reward not found');
  END IF;
  
  IF v_reward.status != 'unlocked' THEN
    RETURN json_build_object('success', false, 'message', 'This reward is not available for redemption');
  END IF;
  
  SELECT EXISTS(
    SELECT 1 FROM public.reward_redemptions 
    WHERE user_id = p_user_id AND reward_id = p_reward_id
  ) INTO v_already_redeemed;
  
  IF v_already_redeemed THEN
    RETURN json_build_object('success', false, 'message', 'You have already redeemed this reward');
  END IF;
  
  SELECT total_points INTO v_user_points FROM public.rewards WHERE user_id = p_user_id;
  
  IF v_user_points IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'User rewards not found');
  END IF;
  
  IF v_user_points < v_reward.points_required THEN
    RETURN json_build_object(
      'success', false, 
      'message', 'Insufficient points',
      'required', v_reward.points_required,
      'current', v_user_points
    );
  END IF;
  
  UPDATE public.rewards
  SET total_points = total_points - v_reward.points_required
  WHERE user_id = p_user_id;
  
  INSERT INTO public.point_transactions (user_id, points, transaction_type, description)
  VALUES (
    p_user_id, 
    -v_reward.points_required, 
    'reward_redemption',
    'Redeemed: ' || v_reward.title
  );
  
  INSERT INTO public.reward_redemptions (
    user_id, 
    reward_id, 
    points_spent, 
    redemption_details,
    status,
    completed_at
  )
  VALUES (
    p_user_id,
    p_reward_id,
    v_reward.points_required,
    p_redemption_details,
    'completed',
    NOW()
  );
  
  RETURN json_build_object(
    'success', true,
    'message', 'Reward redeemed successfully',
    'points_spent', v_reward.points_required,
    'remaining_points', v_user_points - v_reward.points_required
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;