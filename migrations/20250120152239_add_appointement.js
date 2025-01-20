exports.up = function (knex) 
{
 return knex.raw(`
CREATE OR REPLACE FUNCTION add_appointment(
   _userID INT,
   _userName VARCHAR(100),
   _slotdate TIMESTAMP,
   _city VARCHAR(100),
   _barber VARCHAR(100),
   _phoneNumber VARCHAR(100),
   _roleFor VARCHAR(100)
) RETURNS void AS $$
BEGIN
   BEGIN
       -- Check if the time difference between appointments for the same barber is less than 15 minutes
       IF EXISTS (
           SELECT 1
           FROM appointments
           WHERE barber = _barber
           AND ABS(EXTRACT(EPOCH FROM (_slotdate - slot_date)) / 60) < 15
       ) THEN
           RAISE EXCEPTION 'Appointments must be at least 15 minutes apart'
           USING ERRCODE = 'P0001';
       END IF;

       -- Check if the time slot is already booked
       IF EXISTS (
           SELECT 1
           FROM appointments
           WHERE slot_date = _slotdate
       ) THEN
           RAISE EXCEPTION 'This time slot is already booked'
           USING ERRCODE = 'P0002';
       END IF;

       -- Insert the appointment if all checks pass
       INSERT INTO appointments (userid, username, slot_date, city, barber, phonenumber, rolefor)
       VALUES (_userID, _userName, _slotdate, _city, _barber, _phoneNumber, _roleFor);
   EXCEPTION
       WHEN OTHERS THEN
           RAISE EXCEPTION 'An error occurred while adding the appointment: %', SQLERRM
           USING ERRCODE = SQLSTATE;
   END;
END;
$$ LANGUAGE plpgsql;
 `);
};

exports.down = function (knex) {
 return knex.raw(`
   DROP FUNCTION IF EXISTS add_appointment(
       INT, 
       VARCHAR(100), 
       TIMESTAMP, 
       VARCHAR(100), 
       VARCHAR(100), 
       VARCHAR(100), 
       VARCHAR(100)
   );
 `);
};
