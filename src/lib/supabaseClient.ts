import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hqjhnwsvgygexfxkcmdt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxamhud3N2Z3lnZXhmeGtjbWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMDEwMTcsImV4cCI6MjA4Mzc3NzAxN30.Cddtr6AFjVMFzYatyy8WlsC4EQDw_cOjCQMBtNsc1PI"
);
