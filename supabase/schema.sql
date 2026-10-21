-- ==============================================================================
-- Voyara Journeys — Supabase PostgreSQL Database Schema & Row-Level Security
-- Mode B: Enterprise Travel Agent SaaS
-- ==============================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('Owner', 'Agent', 'Accountant');
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Quote sent', 'Negotiation', 'Won', 'Lost');
CREATE TYPE booking_status AS ENUM ('Draft', 'Confirmed', 'In Progress', 'Completed', 'Cancelled');
CREATE TYPE payment_status AS ENUM ('Paid', 'Partial', 'Due', 'Overdue');
CREATE TYPE supplier_category AS ENUM ('Hotel', 'Transport', 'Activity / Guide', 'Charter Flight');

-- 2. Agencies Table (Multi-tenant foundation)
CREATE TABLE IF NOT EXISTS public.agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  tagline TEXT DEFAULT 'Private Luxury & Bespoke Travel Curators',
  gstin VARCHAR(15),
  iata_number VARCHAR(20),
  address TEXT,
  city VARCHAR(100) DEFAULT 'New Delhi',
  country VARCHAR(100) DEFAULT 'India',
  currency VARCHAR(10) DEFAULT 'INR',
  gst_rate_pct NUMERIC(4,2) DEFAULT 5.00,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Profiles / Team Members (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone VARCHAR(20),
  role user_role DEFAULT 'Agent',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100),
  tier VARCHAR(30) DEFAULT 'Silver',
  total_spend NUMERIC(12,2) DEFAULT 0,
  trips_count INTEGER DEFAULT 0,
  dietary_preferences TEXT,
  preferences JSONB DEFAULT '[]'::jsonb,
  birthday DATE,
  anniversary DATE,
  passport_number VARCHAR(30),
  passport_expiry DATE,
  notes TEXT,
  last_trip_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Packages & Inventory
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  tagline TEXT,
  destination VARCHAR(100) NOT NULL,
  region VARCHAR(30) DEFAULT 'Domestic',
  duration_days INTEGER NOT NULL DEFAULT 5,
  price_per_person_inr NUMERIC(12,2) NOT NULL,
  cost_per_person_inr NUMERIC(12,2) NOT NULL,
  gross_margin_pct NUMERIC(5,2) NOT NULL,
  total_capacity INTEGER DEFAULT 20,
  booked_seats INTEGER DEFAULT 0,
  available_seats INTEGER DEFAULT 20,
  hero_image TEXT,
  inclusions JSONB DEFAULT '[]'::jsonb,
  exclusions JSONB DEFAULT '[]'::jsonb,
  itinerary JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Leads CRM Pipeline
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  budget_inr NUMERIC(12,2) NOT NULL,
  pax INTEGER DEFAULT 2,
  travel_month VARCHAR(50),
  status lead_status DEFAULT 'New',
  score INTEGER DEFAULT 75,
  source VARCHAR(50) DEFAULT 'Website',
  follow_up_date DATE,
  is_overdue BOOLEAN DEFAULT FALSE,
  notes TEXT,
  ai_follow_up_draft TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  booking_code VARCHAR(50) NOT NULL UNIQUE,
  package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone VARCHAR(20) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  package_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  pax_adults INTEGER DEFAULT 2,
  pax_children INTEGER DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  paid_amount NUMERIC(12,2) DEFAULT 0,
  status booking_status DEFAULT 'Confirmed',
  payment_status payment_status DEFAULT 'Due',
  travellers JSONB DEFAULT '[]'::jsonb,
  checklist JSONB DEFAULT '{"passport": true, "visa": false, "flights": false, "hotelVouchers": true, "insurance": false}'::jsonb,
  notes TEXT,
  invoice_number VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Invoices & GST Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  client_gst VARCHAR(15),
  destination VARCHAR(100) NOT NULL,
  subtotal NUMERIC(12,2) NOT NULL,
  cgst NUMERIC(12,2) DEFAULT 0,
  sgst NUMERIC(12,2) DEFAULT 0,
  igst NUMERIC(12,2) DEFAULT 0,
  total_with_tax NUMERIC(12,2) NOT NULL,
  amount_paid NUMERIC(12,2) DEFAULT 0,
  balance_due NUMERIC(12,2) NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  status payment_status DEFAULT 'Due',
  aging_bucket VARCHAR(20) DEFAULT '0-15d',
  schedules JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Suppliers Table
CREATE TABLE IF NOT EXISTS public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category supplier_category NOT NULL,
  location VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100),
  phone VARCHAR(30),
  email VARCHAR(100),
  rating NUMERIC(2,1) DEFAULT 4.8,
  contracted_net_rate_inr NUMERIC(12,2) NOT NULL,
  retail_price_inr NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row-Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;

-- Helper function to fetch the user's agency_id
CREATE OR REPLACE FUNCTION public.get_auth_agency_id()
RETURNS UUID AS $$
  SELECT agency_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Agencies policy
CREATE POLICY "Users can view their own agency"
  ON public.agencies FOR SELECT
  USING (id = public.get_auth_agency_id());

-- Bookings policy
CREATE POLICY "Users can access bookings belonging to their agency"
  ON public.bookings FOR ALL
  USING (agency_id = public.get_auth_agency_id());

-- Leads policy
CREATE POLICY "Users can access leads belonging to their agency"
  ON public.leads FOR ALL
  USING (agency_id = public.get_auth_agency_id());

-- Customers policy
CREATE POLICY "Users can access customers belonging to their agency"
  ON public.customers FOR ALL
  USING (agency_id = public.get_auth_agency_id());

-- Invoices policy
CREATE POLICY "Users can access invoices belonging to their agency"
  ON public.invoices FOR ALL
  USING (agency_id = public.get_auth_agency_id());

-- Enable Realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.invoices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.packages;
