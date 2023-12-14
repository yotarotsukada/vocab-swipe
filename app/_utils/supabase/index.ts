import { createClient } from '@supabase/supabase-js';

export const createSupabaseClient = () => {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    (() => {
      console.error('NEXT_PUBLIC_SUPABASE_URL is unset!');
      return '';
    })();
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    (() => {
      console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY is unset!');
      return '';
    })();

  return createClient(supabaseUrl, supabaseAnonKey);
};
