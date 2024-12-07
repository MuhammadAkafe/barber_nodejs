exports.up = function (knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION update_appointment(
          _user_id INT,
          _rolefor VARCHAR(100),
          _slot_time TIMESTAMP,
          _updated_time TIMESTAMP
      ) RETURNS VOID AS $$
      BEGIN
          IF EXISTS (
              SELECT 1
              FROM appointments
              WHERE user_id = _user_id
                AND slot_time = _slot_time
          ) THEN
              RAISE EXCEPTION 'This time slot is already booked';
          ELSE
              UPDATE appointments
              SET 
                  rolefor = _rolefor,
                  slot_time = _updated_time
              WHERE user_id = _user_id
                AND slot_time = _slot_time;
          END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS update_appointment(int, VARCHAR, TIMESTAMP, TIMESTAMP);
    `);
  };
  