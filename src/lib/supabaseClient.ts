// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase project URL and public anon key
const supabaseUrl = 'https://hqjhnwsvgygexfxkcmdt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxamhud3N2Z3lnZXhmeGtjbWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDEwMTcsImV4cCI6MjA4Mzc3NzAxN30.Cddtr6AFjVMFzYatyy8WlsC4EQDw_cOjCQMBtNsc1PI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
