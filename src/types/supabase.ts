export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          role: string
          social_links: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          role?: string
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          role?: string
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
      }
      saved_calculations: {
        Row: {
          id: string
          user_id: string
          name: string
          property_details: Json
          expenses: Json
          expected_rent: number
          metrics: Json
          analysis: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          property_details: Json
          expenses: Json
          expected_rent: number
          metrics: Json
          analysis: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          property_details?: Json
          expenses?: Json
          expected_rent?: number
          metrics?: Json
          analysis?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}