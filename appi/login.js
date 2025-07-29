// api/login.js

import { createClient } from '@supabase/supabase-js';

// ✅ Import env vars (automatically injected by Vercel)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,           // 👉 REPLACE WITH YOUR SUPABASE URL (from .env)
  process.env.VITE_SUPABASE_ANON_KEY       // 👉 REPLACE WITH YOUR SUPABASE ANON KEY (from .env)
);

// ✅ Serverless handler
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // ✅ Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: data.user,
      accessToken: data.session.access_token,
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
