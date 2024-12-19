exports.up = function (knex) {
  return knex.raw(`
    
CREATE OR REPLACE FUNCTION delete_appointment(
    _user_id INT,
    _slot_time TIMESTAMP
) RETURNS BOOLEAN AS $$
DECLARE
    rows_deleted INT;
BEGIN
    -- Attempt to delete the appointment
    DELETE FROM appointments
    WHERE id = _user_id AND slot_time = _slot_time
    RETURNING 1 INTO rows_deleted;

    -- If no rows were deleted, return FALSE
    IF rows_deleted IS NULL THEN
        RETURN FALSE;
    END IF;

    -- If rows were deleted, return TRUE
    RETURN TRUE;
EXCEPTION
    WHEN OTHERS THEN
        -- Handle unexpected errors
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    DROP FUNCTION IF EXISTS delete_appointment(INT, TIMESTAMP);
  `);
};
