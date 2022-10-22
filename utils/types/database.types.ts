export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type UserProfile = Database['public']['Tables']['profiles']['Row']
export type Profiles = UserProfile[]
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          name: string
          avatar_url: string | null
          entries: number
        }
        Insert: {
          id: string
          updated_at?: string | null
          name: string
          avatar_url?: string | null
          entries?: number
        }
        Update: {
          id?: string
          updated_at?: string | null
          name?: string
          avatar_url?: string | undefined
          entries?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
