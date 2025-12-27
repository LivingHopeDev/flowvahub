INSERT INTO public.rewards_catalog (title, description, points_required, reward_type, icon_emoji, status)
VALUES 
  ('$5 Bank Transfer', 'The $5 equivalent will be transferred to your bank account.', 5000, 'bank_transfer', '💳', 'locked'),
  ('$5 PayPal International', 'Receive a $5 PayPal balance transfer directly to your PayPal account email.', 5000, 'paypal', '💳', 'unlocked'),
  ('$5 Virtual Visa Card', 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', 5000, 'virtual_card', '🎁', 'coming-soon')
ON CONFLICT DO NOTHING;