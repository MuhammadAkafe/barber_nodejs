exports.up = function (knex) {
    return knex.raw(
      `
CREATE OR REPLACE FUNCTION check_slot_availability(
    _user_id INT,
    _updated_time TIMESTAMP
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM appointments
        WHERE slot_time = _updated_time
    );
END;
$$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS check_slot_availability(int, TIMESTAMP);
    `);
  };
  