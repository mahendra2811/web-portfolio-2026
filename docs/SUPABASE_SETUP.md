# Supabase Setup Guide

## 1. Create Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name: `mahendra-portfolio`
3. Region: `ap-south-1` (Mumbai)
4. Generate a strong database password — save it

## 2. Get API Keys
1. Settings → API
2. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep secret)

## 3. Create Tables
Go to SQL Editor → New Query → paste ALL of the following and run:

```sql
-- Contacts table
CREATE TABLE public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON public.contacts FOR UPDATE USING (auth.role() = 'authenticated');

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  thumbnail_url TEXT,
  images TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  category TEXT,
  featured BOOLEAN DEFAULT false,
  live_url TEXT,
  github_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  year TEXT,
  highlights TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read published" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Allow authenticated full access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Page views table
CREATE TABLE public.page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON public.page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.page_views FOR SELECT USING (auth.role() = 'authenticated');
```

## 4. Create Admin User
1. Authentication → Users → Invite User
2. Enter your email and password
3. This user can access `/admin` routes

## 5. Update Environment
Add keys to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Contact form fails silently | Check Supabase URL/key in .env.local |
| Admin page redirects to login | Create a user in Authentication |
| RLS errors | Ensure policies are created (step 3) |
| App works without Supabase | Yes, all services have graceful fallbacks |
