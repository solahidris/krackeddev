-- Enable RLS for bounties if not already (it is in 007 but good practice to ensure)
alter table public.bounties enable row level security;

-- Policy: Admins can insert bounties
create policy "Admins can insert bounties"
  on public.bounties for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Policy: Admins can update bounties
create policy "Admins can update bounties"
  on public.bounties for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Policy: Admins can delete bounties
create policy "Admins can delete bounties"
  on public.bounties for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
