/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return await knex.raw (
        `
CREATE OR REPLACE FUNCTION select_all_appointments(
    _user_id INT
)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(row_to_json(appointments)) 
    INTO result
    FROM appointments 
    WHERE userid = _user_id;
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error fetching appointments: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
        `
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return await knex.raw('DROP FUNCTION IF EXISTS select_all_appointments');
};
