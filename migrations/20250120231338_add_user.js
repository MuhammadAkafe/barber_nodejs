/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.raw(`
    CREATE OR REPLACE FUNCTION add_user(    
      _username varchar(100),
      _email varchar(100),
      _password varchar(100),
      _phonenumber varchar(100)
    ) RETURNS void AS $$
    BEGIN
      -- Check if the email already exists
      IF EXISTS (SELECT 1 FROM users WHERE email = _email) THEN
        RAISE EXCEPTION 'Email already exists';
      END IF;

      -- Insert the new user into the users table (without the isadmin field)
      INSERT INTO users(username, email, password, phonenumber)
      VALUES (_username, _email, _password, _phonenumber);

    END;
    $$ LANGUAGE plpgsql;
  `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.raw('DROP FUNCTION IF EXISTS add_user');
};
