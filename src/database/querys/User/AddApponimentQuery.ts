import { appointmentsdata } from '../../../interfaces/RoleData';
import { GlobalQuery } from '../GlobalQuery';
import dayjs from 'dayjs';

/**
 * `AddAppointment` هي فئة مسؤولة عن حجز موعد جديد في النظام.
 * ترث الفئة `GlobalQuery`، مما يمنحها إمكانية تنفيذ الاستعلامات على قاعدة البيانات.
 */

export default class AddAppointment extends GlobalQuery implements appointmentsdata {

    public user_id: string;
    public user_name: string;
    public slot_date: dayjs.Dayjs;
    public city: string;
    public barber: string;
    public phone_number: string;
    public role_for: string;

    /**
     * منشئ الفئة: يقوم بتهيئة البيانات المطلوبة لحجز الموعد.
     * @param form_data - كائن يحتوي على بيانات الموعد.
     */
    constructor(form_data: appointmentsdata) {
        super();
        this.user_id = form_data.user_id;
        this.user_name = form_data.user_name;
        this.slot_date = dayjs(form_data.slot_date); // التأكد من تحويل التاريخ باستخدام dayjs
        this.city = form_data.city;
        this.barber = form_data.barber;
        this.phone_number = form_data.phone_number;
        this.role_for = form_data.role_for;
    }

    /**
     * `addAppointment` هي دالة تضيف موعدًا جديدًا إلى قاعدة البيانات.
     * @returns `Promise<any>` نتيجة تنفيذ الاستعلام.
     */
    public async addAppointment(): Promise<any> {
        try {
            // استعلام SQL لاستدعاء دالة `add_appointment` المخزنة في قاعدة البيانات
            const query = `SELECT add_appointment($1, $2, $3, $4, $5, $6, $7)`;
            // تنفيذ الاستعلام وتمرير القيم من الكائن الحالي
            return await this.query(query, [
                this.user_id,
                this.user_name,
                this.slot_date.format(`YYYY-MM-DD HH:mm:ss`), // تنسيق التاريخ قبل الإرسال
                this.city,
                this.phone_number,
                this.barber,
                this.role_for
            ]);
        } 
        catch (error: any) {
            console.error('Error adding appointment:', error);
            throw new Error(`${error.message}`);
        }
    }
}
