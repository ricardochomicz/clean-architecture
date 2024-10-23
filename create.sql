drop schema chomicz cascade;
create schema chomicz;

create table chomicz.event (
  event_id uuid primary key,
  description text,
  price numeric
);

create table chomicz.ticket (
    ticket_id uuid primary key,
    event_id uuid,
    email text,
    price numeric
);

insert into chomicz.event (event_id, description, price) values ('768bdbe9-6e65-47a4-ad80-60ac28a1a3f9', 'A', 100);

