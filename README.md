# Flowva Hub Application

## Project Overview

Rewards Hub is a comprehensive rewards management system that allows users to earn points through daily check-ins, referrals, and sharing activities. Users can track their progress and redeem rewards in a seamless and engaging interface.

Key functionalities include:

- Daily check-ins with streak tracking
- Referral system with unique referral codes
- Share-to-earn feature
- Real-time points updates
- Rewards catalog and redemption system

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **State Management:** Zustand
- **Backend:** Supabase (PostgreSQL)
- **Package Manager:** Bun
- **UI Components:** Shadcn/ui with Tailwind CSS
- **Notifications:** Sonner (toast notifications)

---

## Features Implemented

1. **Authentication**
   - Manual signup/login
   - Google OAuth
2. **Daily Check-In System**
   - Earn 5 points per day
   - Streak tracking with visual indicators
3. **Referral System**
   - Earn 25 points per successful referral
   - Unique 8-character alphanumeric referral codes
4. **Points Balance Tracking**
   - Real-time updates using Supabase Realtime
   - Progress visualization
5. **Share Tool Stack Feature**
   - Earn 25 points per share
6. **Point Transactions**
   - Immutable transaction logs for auditing
7. **Rewards Catalog**
   - Browse and redeem rewards based on points

---

## Database Schema

| Table                | Columns                                                                  | Description                                     |
| -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| `profiles`           | `id`, `user_id`, `name`, `email`, `role`, `referral_code`                | Stores user profile info and referral codes     |
| `rewards`            | `id`, `user_id`, `total_points`, `current_streak`, `last_check_in`       | Tracks points, streaks, and check-ins           |
| `point_transactions` | `id`, `user_id`, `points`, `transaction_type`, `description`             | Immutable log of all point-related transactions |
| `referrals`          | `id`, `referrer_id`, `referred_id`, `points_awarded`                     | Tracks referral activity and points awarded     |
| `user_shares`        | `id`, `user_id`, `share_type`, `shared_at`                               | Tracks sharing activity for points              |
| `rewards_catalog`    | `id`, `title`, `description`, `points_required`, `reward_type`, `status` | List of available rewards for redemption        |

---

## Prerequisites

- Node.js >= 20.x (required for Bun)

- Bun package manager

- Supabase account and project

- PostgreSQL (via Supabase)

---

## Installation Steps

#### Clone the repository

```bash
https://github.com/LivingHopeDev/flowvahub.git

cd flowvahub

# Install dependencies
bun install
```

Set up environment variables in .env file (see above).

## Running the Application

```bash
# Start the development server
bun dev
```

## Key Features Explanation

1. Daily Check-Ins

   - Users manually check in once per day

   - Earn 5 points per day

   - Streak resets to 0 if a day is missed

2. Referral System

   - Each user has a unique 8-character referral code

   - Points awarded immediately when referral signs up

   - Users can only be referred once

3. Share-to-Earn

   - Users can share tool stacks multiple times per day

   - Earn 25 points per share

   - Tracked in real-time

4. Rewards Catalog

   - Users can redeem points for rewards

   - Redemption is based on points_required for each reward

   - Status indicates availability (locked,unlocked, coming-soon)

# Assumptions

- Streak resets to 0 if the user misses a day.

- Daily check-in requires manual button click.

- Referral points awarded immediately upon signup.

- Users can share tool stack multiple times per day.

- Points balance updates in real-time across sessions.

- Referral codes are auto-generated 8-character alphanumeric strings.

- Point transactions are immutable.

- Each user can only be referred once.
- Users can redeem a gift when they have up to the required points and the gift is unlocked.
- Each user can only redeem one gift once.
