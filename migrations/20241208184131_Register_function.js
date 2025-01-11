/**
 * Migration for the "Register" function.
 */
exports.up = function(knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION Register(
          _username VARCHAR(100),
          _email VARCHAR(100),
          _phonenumber VARCHAR(100),
          _password VARCHAR(100),
          _isAdmin BOOLEAN
      ) RETURNS VOID AS $$
      BEGIN
          -- Check if there is an existing user
          IF  check_if_User_exists(_email) THEN
              RAISE EXCEPTION 'User already exists';
          ELSE
              -- Insert the user if not already registered
              INSERT INTO users (username, email, phoneNumber, password, isadmin)
              VALUES (_username, _email, _phonenumber, _password, _isAdmin);
          END IF;
      END;
      $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function(knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS Register(
          VARCHAR(100),
          VARCHAR(100),
          VARCHAR(100),
          VARCHAR(100),
          BOOLEAN
      );
    `);
  };
  