import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
        CREATE OR REPLACE FUNCTION book_appointment(
            p_username TEXT,
            p_appointment_date DATE,
            p_appointment_time TIME,
            p_city TEXT,
            p_phonenumber TEXT,
            p_rolefor TEXT,
            p_barber TEXT
        ) RETURNS TEXT AS $$
        DECLARE
            current_date_time TIMESTAMP := now();
            selected_datetime TIMESTAMP := p_appointment_date + p_appointment_time;
            conflicting RECORD;
        BEGIN
            -- تحقق من أن الموعد ليس في الماضي
            IF selected_datetime < current_date_time THEN
                RETURN 'Appointment date/time cannot be in the past.';
            END IF;
    
            -- التحقق من وجود موعد لنفس الحلاق خلال 15 دقيقة قبل أو بعد
            SELECT *
            INTO conflicting
            FROM appointments
            WHERE appointment_date = p_appointment_date
              AND barber = p_barber
              AND ABS(EXTRACT(EPOCH FROM (appointment_time - p_appointment_time))) < 900
            LIMIT 1;
    
            IF FOUND THEN
                RETURN 'This appointment conflicts with another (less than 15 minutes apart).';
            END IF;
    
            -- إدخال الموعد
            INSERT INTO appointments (
                username,
                appointment_date,
                appointment_time,
                city,
                phonenumber,
                rolefor,
                barber
            )
            VALUES (
                p_username,
                p_appointment_date,
                p_appointment_time,
                p_city,
                p_phonenumber,
                p_rolefor,
                p_barber
            );
    
            RETURN 'Appointment booked successfully.';
        END;
        $$ LANGUAGE plpgsql;
      `);
    
}


export async function down(knex: Knex): Promise<void> 
{
    return knex.raw(`DROP FUNCTION IF EXISTS book_appointment`);
}

