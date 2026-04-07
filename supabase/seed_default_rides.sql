-- Seed demo rides so "Take a Ride" has visible data.
-- Run this AFTER users/vehicle_types/rides tables exist and at least one user profile is present.

-- Optional: clear old demo rides (identified by fare values used below)
delete from public.rides
where fare in (99, 149, 199);

with ranked_users as (
  select
    id,
    row_number() over (order by created_at asc) as rn
  from public.users
),
first_vehicle as (
  select id
  from public.vehicle_types
  order by total_seats asc
  limit 1
)
insert into public.rides (
  driver_id,
  source,
  intermediate_points,
  destination,
  vehicle_type_id,
  available_seats,
  fare,
  female_only,
  status
)
select
  u.id as driver_id,
  seed.source::jsonb,
  seed.intermediate_points::jsonb,
  seed.destination::jsonb,
  v.id as vehicle_type_id,
  seed.available_seats,
  seed.fare,
  seed.female_only,
  'active' as status
from (
  values
    (
      1,
      '{"latitude":17.3850,"longitude":78.4867}',
      '[{"latitude":17.4021,"longitude":78.4806}]',
      '{"latitude":17.4375,"longitude":78.4482}',
      3,
      99::numeric,
      false
    ),
    (
      1,
      '{"latitude":17.3616,"longitude":78.4747}',
      '[{"latitude":17.3730,"longitude":78.4900}]',
      '{"latitude":17.4440,"longitude":78.3772}',
      2,
      149::numeric,
      true
    ),
    (
      1,
      '{"latitude":17.4399,"longitude":78.4983}',
      '[{"latitude":17.4126,"longitude":78.4668}]',
      '{"latitude":17.2403,"longitude":78.4294}',
      4,
      199::numeric,
      false
    )
) as seed(user_rank, source, intermediate_points, destination, available_seats, fare, female_only)
join ranked_users u
  on u.rn = seed.user_rank
cross join first_vehicle v;

