-- Sessions for DAU tracking
CREATE TABLE IF NOT EXISTS glowup_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);
ALTER TABLE glowup_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users insert own sessions" ON glowup_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily exercise completions
CREATE TABLE IF NOT EXISTS glowup_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date date DEFAULT CURRENT_DATE NOT NULL,
  exercises_done integer DEFAULT 0,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, date)
);
ALTER TABLE glowup_completions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own completions" ON glowup_completions FOR ALL USING (auth.uid() = user_id);

-- Push subscriptions
CREATE TABLE IF NOT EXISTS glowup_push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  subscription jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);
ALTER TABLE glowup_push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own push" ON glowup_push_subscriptions FOR ALL USING (auth.uid() = user_id);
