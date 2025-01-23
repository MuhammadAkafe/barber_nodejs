/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return await knex.raw(`
     CREATE OR REPLACE FUNCTION add_barber(
    _barber varchar(100),
    _city varchar(100),
    _phone_number varchar(100),
    _opening_time timestamp,
    _closing_time timestamp
  ) RETURNS void AS $$
    BEGIN
    
        IF EXISTS (SELECT 1 FROM barbers WHERE barber = _barber) THEN
        RAISE EXCEPTION 'Barber already exists';
        END IF;
    
        INSERT INTO barbers(barber, city, phone_number, opening_time, closing_time)
        VALUES (_barber, _city, _phone_number, _opening_time, _closing_time);
    END;
$$ LANGUAGE plpgsql;
  `);
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  return await knex.raw('DROP FUNCTION IF EXISTS add_barber');
};
