create extension if not exists pgcrypto;

create type public.app_role as enum ('owner', 'admin', 'editor', 'viewer');
create type public.client_status as enum ('lead', 'prospect', 'active', 'paused', 'churned', 'archived');
create type public.client_service_status as enum ('pending', 'active', 'paused', 'cancelled');
create type public.lead_source as enum ('referral', 'website', 'ads', 'cold_outreach', 'event', 'partnership', 'other');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost', 'nurture');
create type public.qualification_status as enum ('unqualified', 'working', 'qualified', 'disqualified');
create type public.proposal_status as enum ('draft', 'sent', 'accepted', 'rejected', 'expired');
create type public.activity_kind as enum ('note', 'call', 'email', 'meeting', 'task', 'stage_change', 'proposal_sent', 'service', 'onboarding', 'review');
create type public.billing_type as enum ('flat_fee', 'hourly', 'percentage_of_spend', 'project');
create type public.priority_level as enum ('low', 'medium', 'high');
create type public.device_type as enum ('desktop', 'mobile', 'tablet');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_memberships (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  category text not null,
  base_price numeric(12, 2) not null default 0,
  billing_type public.billing_type not null default 'flat_fee',
  deliverables text[] not null default '{}',
  expected_hours_per_month integer,
  is_active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  company_name text,
  email text,
  phone text,
  website text,
  industry text,
  status public.client_status not null default 'prospect',
  health_score integer not null default 0 check (health_score between 0 and 100),
  assigned_to uuid references auth.users(id) on delete set null,
  notes text,
  tags text[] not null default '{}',
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz
);

create table public.client_services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  status public.client_service_status not null default 'pending',
  monthly_price numeric(12, 2) not null default 0,
  start_date date not null default current_date,
  end_date date,
  contract_type text not null default 'month-to-month',
  auto_renew boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete set null,
  contact_name text not null,
  company_name text not null,
  contact_email text,
  contact_phone text,
  website text,
  source public.lead_source not null default 'other',
  source_detail text,
  source_campaign text,
  source_channel text,
  first_contact_date date not null default current_date,
  first_contact_method text,
  service_interest uuid[] not null default '{}',
  estimated_close_date date,
  status public.lead_status not null default 'new',
  estimated_value numeric(12, 2) not null default 0,
  probability integer not null default 0 check (probability between 0 and 100),
  assigned_to uuid references auth.users(id) on delete set null,
  last_activity_date date,
  next_follow_up_date date,
  qualification_score integer check (qualification_score between 0 and 100),
  qualification_status public.qualification_status not null default 'working',
  disqualified_reason text,
  is_stale boolean not null default false,
  converted_at timestamptz,
  lost_reason text,
  duplicate_of_lead_id uuid references public.leads(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  activity_type public.activity_kind not null default 'note',
  summary text not null,
  activity_date timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  next_step text,
  next_step_due_date date,
  created_at timestamptz not null default now()
);

create table public.proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  lead_id uuid not null references public.leads(id) on delete cascade,
  services uuid[] not null default '{}',
  total_monthly_value numeric(12, 2) not null default 0,
  one_time_fees numeric(12, 2) not null default 0,
  status public.proposal_status not null default 'draft',
  sent_date date,
  accepted_date date,
  rejected_date date,
  expiry_date date,
  document_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  activity_type public.activity_kind not null default 'note',
  description text not null,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.onboarding_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  lead_id uuid references public.leads(id) on delete set null,
  status text not null default 'active',
  started_at timestamptz not null default now(),
  target_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seo_projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  domain text not null,
  target_location text,
  search_engine text not null default 'google',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gsc_query_snapshots (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  seo_project_id uuid not null references public.seo_projects(id) on delete cascade,
  date date not null,
  query text not null,
  page_url text,
  country text,
  device public.device_type,
  clicks integer not null default 0,
  impressions integer not null default 0,
  ctr numeric(8, 6) not null default 0,
  average_position numeric(8, 2) not null default 0,
  created_at timestamptz not null default now(),
  unique (seo_project_id, date, query, page_url, country, device)
);

create table public.seo_target_keywords (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  seo_project_id uuid not null references public.seo_projects(id) on delete cascade,
  keyword text not null,
  target_page_url text,
  target_country text,
  target_device public.device_type,
  priority public.priority_level not null default 'medium',
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (seo_project_id, keyword, target_country, target_device)
);

create index clients_organization_id_idx on public.clients(organization_id);
create index client_services_client_id_idx on public.client_services(client_id);
create index leads_organization_status_idx on public.leads(organization_id, status);
create index leads_next_follow_up_idx on public.leads(next_follow_up_date) where status not in ('won', 'lost');
create index lead_activities_lead_id_idx on public.lead_activities(lead_id);
create index activities_client_id_idx on public.activities(client_id);
create index gsc_query_snapshots_project_date_idx on public.gsc_query_snapshots(seo_project_id, date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships
    where organization_id = target_organization_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.has_org_role(target_organization_id uuid, allowed_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.organization_memberships
    where organization_id = target_organization_id
      and user_id = auth.uid()
      and role = any(allowed_roles)
  );
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger organizations_set_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger services_set_updated_at before update on public.services for each row execute function public.set_updated_at();
create trigger clients_set_updated_at before update on public.clients for each row execute function public.set_updated_at();
create trigger client_services_set_updated_at before update on public.client_services for each row execute function public.set_updated_at();
create trigger leads_set_updated_at before update on public.leads for each row execute function public.set_updated_at();
create trigger proposals_set_updated_at before update on public.proposals for each row execute function public.set_updated_at();
create trigger onboarding_records_set_updated_at before update on public.onboarding_records for each row execute function public.set_updated_at();
create trigger seo_projects_set_updated_at before update on public.seo_projects for each row execute function public.set_updated_at();
create trigger seo_target_keywords_set_updated_at before update on public.seo_target_keywords for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.client_services enable row level security;
alter table public.leads enable row level security;
alter table public.lead_activities enable row level security;
alter table public.proposals enable row level security;
alter table public.activities enable row level security;
alter table public.onboarding_records enable row level security;
alter table public.seo_projects enable row level security;
alter table public.gsc_query_snapshots enable row level security;
alter table public.seo_target_keywords enable row level security;

create policy "Users can view own profile" on public.profiles for select using (id = auth.uid());
create policy "Users can update own profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "Users can insert own profile" on public.profiles for insert with check (id = auth.uid());

create policy "Authenticated users can create organizations" on public.organizations for insert to authenticated with check (true);
create policy "Members can view organizations" on public.organizations for select using (public.is_org_member(id));
create policy "Owners and admins can update organizations" on public.organizations for update using (public.has_org_role(id, array['owner', 'admin']::public.app_role[])) with check (public.has_org_role(id, array['owner', 'admin']::public.app_role[]));

create policy "Members can view memberships" on public.organization_memberships for select using (public.is_org_member(organization_id));
create policy "Users can create own membership bootstrap" on public.organization_memberships for insert to authenticated with check (user_id = auth.uid());
create policy "Owners and admins can manage memberships" on public.organization_memberships for update using (public.has_org_role(organization_id, array['owner', 'admin']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin']::public.app_role[]));

create policy "Members can read services" on public.services for select using (public.is_org_member(organization_id));
create policy "Editors can write services" on public.services for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read clients" on public.clients for select using (public.is_org_member(organization_id));
create policy "Editors can write clients" on public.clients for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read client services" on public.client_services for select using (public.is_org_member(organization_id));
create policy "Editors can write client services" on public.client_services for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read leads" on public.leads for select using (public.is_org_member(organization_id));
create policy "Editors can write leads" on public.leads for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read lead activities" on public.lead_activities for select using (public.is_org_member(organization_id));
create policy "Editors can write lead activities" on public.lead_activities for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read proposals" on public.proposals for select using (public.is_org_member(organization_id));
create policy "Editors can write proposals" on public.proposals for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read activities" on public.activities for select using (public.is_org_member(organization_id));
create policy "Editors can write activities" on public.activities for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read onboarding records" on public.onboarding_records for select using (public.is_org_member(organization_id));
create policy "Editors can write onboarding records" on public.onboarding_records for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read seo projects" on public.seo_projects for select using (public.is_org_member(organization_id));
create policy "Editors can write seo projects" on public.seo_projects for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read gsc snapshots" on public.gsc_query_snapshots for select using (public.is_org_member(organization_id));
create policy "Editors can write gsc snapshots" on public.gsc_query_snapshots for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));

create policy "Members can read seo target keywords" on public.seo_target_keywords for select using (public.is_org_member(organization_id));
create policy "Editors can write seo target keywords" on public.seo_target_keywords for all using (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[])) with check (public.has_org_role(organization_id, array['owner', 'admin', 'editor']::public.app_role[]));
