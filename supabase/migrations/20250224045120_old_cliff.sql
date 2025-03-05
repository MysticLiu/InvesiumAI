/*
  # Fix saved calculations table structure

  1. Changes
    - Remove date column (using created_at instead)
    - Update column types to match frontend data structure
    - Add proper indexes for performance

  2. Security
    - Maintain existing RLS policies
*/

-- Drop the existing saved_calculations table if it exists
DROP TABLE IF EXISTS saved_calculations;

-- Create the saved_calculations table with the correct structure
CREATE TABLE saved_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  property_details jsonb NOT NULL,
  expenses jsonb NOT NULL,
  expected_rent numeric NOT NULL,
  metrics jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE saved_calculations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
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

-- Create indexes for better performance
CREATE INDEX saved_calculations_user_id_idx ON saved_calculations(user_id);
CREATE INDEX saved_calculations_created_at_idx ON saved_calculations(created_at DESC);

-- Create trigger for updating updated_at
CREATE TRIGGER update_saved_calculations_updated_at
  BEFORE UPDATE ON saved_calculations
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();