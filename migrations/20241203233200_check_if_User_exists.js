exports.up = function (knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION check_if_User_exists(
          _email varchar(100)
      ) RETURNS BOOLEAN AS $$
      BEGIN
          IF EXISTS (
              SELECT 1
              FROM users
              WHERE email = _email
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
      DROP FUNCTION IF EXISTS check_if_User_exists(varchar);
    `);
  };
  