exports.up = function (knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION update_appointment(
        _user_id INT,
        _rolefor VARCHAR(100),
        _slot_time TIMESTAMP,
        _updated_time TIMESTAMP
    ) RETURNS VOID AS $$
    BEGIN
        -- Validate the provided date
        IF NOT validate_appointment_date(_updated_time) THEN
            RAISE EXCEPTION 'Enter a valid date';
        END IF;

        -- Check if the new slot time is already booked
        IF check_slot_availability(_user_id, _updated_time) THEN
            RAISE EXCEPTION 'This updated time slot is already booked';
        END IF;

        -- Update the appointment if validation passes
        UPDATE appointments
        SET 
            rolefor = _rolefor,
            slot_time = _updated_time
        WHERE id = _user_id
          AND slot_time = _slot_time;

        -- Check if any rows were updated
        IF NOT FOUND THEN
            RAISE EXCEPTION 'No appointment found to update for the provided user ID and slot time';
        END IF;
    END;
    $$ LANGUAGE plpgsql;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    DROP FUNCTION IF EXISTS update_appointment(INT, VARCHAR, TIMESTAMP, TIMESTAMP);
  `);
};
