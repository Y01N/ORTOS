import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://suktypejsgfbixoeevun.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1a3R5cGVqc2dmYml4b2VldnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMDg1MTcsImV4cCI6MjA0Mjc4NDUxN30.T7aYoFauSSUY2uckszuH5YsCJ3eMvGMrbtMa4Oasq8w'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})