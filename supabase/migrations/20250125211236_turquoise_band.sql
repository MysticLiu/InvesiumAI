/*
  # Saved Calculations Schema

  1. New Tables
    - `saved_calculations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `name` (text)
      - `property_details` (jsonb)
      - `expenses` (jsonb)
      - `expected_rent` (numeric)
      - `metrics` (jsonb)
      - `analysis` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `saved_calculations` table
    - Add policies for authenticated users to:
      - Read their own calculations
      - Create new calculations
      - Update their own calculations
      - Delete their own calculations
*/

CREATE TABLE IF NOT EXISTS saved_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  property_details jsonb NOT NULL,
  expenses jsonb NOT NULL,
  expected_rent numeric NOT NULL,
  metrics jsonb NOT NULL,
  analysis jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE saved_calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own calculations"
  ON saved_calculations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create calculations"
  ON saved_calculations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations"
  ON saved_calculations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations"
  ON saved_calculations
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_saved_calculations_updated_at
  BEFORE UPDATE ON saved_calculations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();