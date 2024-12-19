exports.up = function (knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION check_if_UserID_exists(
          _user_id INT
      ) RETURNS BOOLEAN AS $$
      BEGIN
          IF EXISTS (
              SELECT 1
              FROM appointments
              WHERE id = _user_id
          ) THEN
              RETURN TRUE;
          ELSE
              RETURN FALSE;
          END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS check_if_UserID_exists(int);
    `);
  };
  