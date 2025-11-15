// Supabase Configuration
// Replace with your actual Supabase credentials

const SUPABASE_CONFIG = {
    url: 'https://tvupfaiwtipzfhtybvjm.supabase.co', // e.g., 'https://xxxxxxxxxxxxx.supabase.co'
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dXBmYWl3dGlwemZodHlidmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDM3MTAsImV4cCI6MjA3ODc3OTcxMH0.Cx4iDuNR6VPd3B13jaGO8noHZDKdkc---VX5U5NESp0' // Your public anon key
};

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Export for use in other files
window.supabaseClient = supabase;
