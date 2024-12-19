exports.up = function (knex) {
  return knex.raw(`
CREATE OR REPLACE FUNCTION add_appointment(
    _user_id INT,
    _username VARCHAR(100),
    _phonenumber VARCHAR(100),
    _rolefor VARCHAR(100),
    _slot_time TIMESTAMP, -- تأكيد أن الإدخال يتم كـ TIMESTAMP
    _payment VARCHAR(100)
) RETURNS VOID AS $$
BEGIN
    -- التحقق من صحة التاريخ
    IF NOT validate_appointment_date(_slot_time) THEN
        RAISE EXCEPTION 'Enter a valid date';
    END IF;

    -- التحقق من توفر الفترة الزمنية
    IF check_slot_availability(_user_id, _slot_time) THEN
        RAISE EXCEPTION 'This time slot is already booked';
    END IF;

    -- إدخال الموعد إذا كان كل شيء صحيحًا
    INSERT INTO appointments (id, username, phonenumber, rolefor, slot_time, payment)
    VALUES (_user_id, _username, _phonenumber, _rolefor, _slot_time::TIMESTAMP, _payment);
END;
$$ LANGUAGE plpgsql;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
      DROP FUNCTION IF EXISTS add_appointment(int, VARCHAR, VARCHAR, VARCHAR, TIMESTAMP, VARCHAR);
  `);
};
