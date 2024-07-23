import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdddlcdxwolqaqtsnkdy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZGRsY2R4d29scWFxdHNua2R5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNTI2MjgsImV4cCI6MjAzNjkyODYyOH0.5JnJXZkJuCKv5YOLpjxVU6zVnPfAsqe8ixZ80AsCQfo';
export const supabase = createClient(supabaseUrl, supabaseKey);
