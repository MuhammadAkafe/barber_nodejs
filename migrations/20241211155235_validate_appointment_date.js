exports.up = function (knex) {
    return knex.raw(`
  CREATE OR REPLACE FUNCTION validate_appointment_date(
      _slot_time TIMESTAMP
  ) RETURNS BOOLEAN AS $$
  DECLARE
      current_date_formatted TEXT;
      provided_date TEXT;
  BEGIN
      -- تنسيق التاريخ الحالي إلى النص
      current_date_formatted := TO_CHAR(CURRENT_DATE, 'DD/MM/YYYY');
  
      -- استخراج التاريخ فقط من _slot_time
      provided_date := TO_CHAR(_slot_time, 'DD/MM/YYYY');
  
      -- تحقق من تطابق التاريخ الحالي مع التاريخ المقدم
      IF current_date_formatted <> provided_date THEN
         RETURN FALSE;
      END IF;
      -- إذا كان التاريخ صحيحًا
      RETURN TRUE;
  END;
  $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
        DROP FUNCTION IF EXISTS validate_appointment_date(TIMESTAMP);
    `);
  };