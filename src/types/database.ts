export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Generated Supabase types will replace this placeholder after the first project is linked.
export type Database = Record<string, never>
