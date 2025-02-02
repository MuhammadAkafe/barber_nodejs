/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = function (knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION add_appointment(
      _userid int,
      _username varchar(100),
      _slot_date timestamp,
      _city varchar(100),
      _phonenumber varchar(100),
      _barber varchar(100),
      _rolefor varchar(100)
    ) RETURNS void AS $$
    BEGIN
      -- Check if the barber exists
      IF NOT EXISTS (SELECT 1 FROM barbers WHERE LOWER(barber) = LOWER(_barber)) THEN
        RAISE EXCEPTION 'Barber does not exist: %', _barber;
      END IF;

      -- Check if the slot is outside barber working hours
      IF EXISTS (
        SELECT 1
        FROM barbers
        WHERE barber = _barber
          AND (
            _slot_date::time < opening_time::time
            OR _slot_date::time > closing_time::time
          )
      ) THEN
        RAISE EXCEPTION 'Slot is outside barber working hours';
      END IF;

      -- Check if the slot is already booked
      IF EXISTS (SELECT 1 FROM appointments WHERE slot_date = _slot_date AND barber = _barber) THEN
        RAISE EXCEPTION 'Slot is already booked';
      END IF;

      -- Check if the slot is in the past
      IF _slot_date < NOW() THEN
        RAISE EXCEPTION 'Cannot book a slot in the past';
      END IF;

      -- Check the time difference between the current appointment and the one to be booked
      IF EXISTS (
        SELECT 1 
        FROM appointments 
        WHERE ABS(EXTRACT(EPOCH FROM (slot_date - _slot_date))) / 60 < 15 AND barber = _barber
      ) THEN
        RAISE EXCEPTION 'Slot is too close to another appointment';
      END IF;

      -- Insert the new appointment
      INSERT INTO appointments(userid, username, slot_date, city, phonenumber,barber,rolefor)
      VALUES (_userid, _username, _slot_date, _city , _phonenumber,_barber, _rolefor);
    END;
    $$ LANGUAGE plpgsql;
  `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function (knex) {
  return await knex.raw('DROP FUNCTION IF EXISTS add_appointment');
}
