exports.up = function (knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION add_appointment(
          _user_id INT,
          _username VARCHAR(100),
          _phonenumber VARCHAR(100),
          _rolefor VARCHAR(100),
          _slot_time TIMESTAMP,
          _payment VARCHAR(100)
      ) RETURNS VOID AS $$
      BEGIN
          -- Call the function to check slot availability
          IF check_slot_availability(_slot_time) THEN
              RAISE EXCEPTION 'This time slot is already booked';
          ELSE
              -- Insert appointment if slot is available
              INSERT INTO appointments (user_id, UserName, PhoneNumber, RoleFor, slot_time, payment)
              VALUES (_user_id, _username, _phonenumber, _rolefor, _slot_time, _payment);
          END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS add_appointment(int, VARCHAR, VARCHAR, VARCHAR, TIMESTAMP, VARCHAR);
    `);
  };
  