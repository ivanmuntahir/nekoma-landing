export type Lead = {
  id?: string
  created_at?: string
  nama: string
  whatsapp: string
  target_formasi: string
  source?: string
}

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: Omit<Lead, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<Lead>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}