exports.up = function (knex) {
  return knex.raw(`
CREATE OR REPLACE FUNCTION add_appointment(
    _userID INT,
    _userName VARCHAR(100),
    _date TIMESTAMP,
    _city VARCHAR(100),
    _barber VARCHAR(100),
    _phoneNumber VARCHAR(100),
    _roleFor VARCHAR(100)
    -- تأكيد أن الإدخال يتم كـ TIMESTAMP
) RETURNS VOID AS $$
BEGIN




    -- التحقق من توفر الفترة الزمنية
    IF check_slot_availability(_userID,_date) THEN
        RAISE EXCEPTION 'This time slot is already booked';
    END IF;

    -- إدخال الموعد إذا كان كل شيء صحيحًا
    INSERT INTO appointments (userID, userName, date, city, barber, phoneNumber, roleFor)
    VALUES (_userID, _userName, _date, _city, _barber, _phoneNumber, _roleFor);
END;
$$ LANGUAGE plpgsql;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
      DROP FUNCTION IF EXISTS add_appointment(int, VARCHAR,TIMESTAMP,VARCHAR, VARCHAR, VARCHAR);
  `);
};
