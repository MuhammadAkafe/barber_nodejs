exports.up = function (knex) {
    return knex.raw(`
      CREATE OR REPLACE FUNCTION delete_appointment(
          _user_id INT,
          _slot_time TIMESTAMP
      ) RETURNS VOID AS $$
      DECLARE
          appointment_count INT;
      BEGIN
          -- التحقق من وجود الموعد المطلوب
          SELECT COUNT(*) INTO appointment_count
          FROM appointments
          WHERE id = _user_id AND slot_time = _slot_time;
  
          -- إذا لم يتم العثور على الموعد
          IF appointment_count = 0 THEN
              RAISE EXCEPTION 'No appointment found for user_id: % and slot_time: %', _user_id, _slot_time;
          END IF;
  
          -- حذف الموعد إذا كان موجودًا
          DELETE FROM appointments 
          WHERE id = _user_id AND slot_time = _slot_time;
  
      EXCEPTION
          WHEN OTHERS THEN
              -- التعامل مع أي خطأ محتمل
              RAISE NOTICE 'An error occurred: %', SQLERRM;
      END;
      $$ LANGUAGE plpgsql;
    `);
  };
  
  exports.down = function (knex) {
    return knex.raw(`
      DROP FUNCTION IF EXISTS delete_appointment(INT, TIMESTAMP);
    `);
  };
  