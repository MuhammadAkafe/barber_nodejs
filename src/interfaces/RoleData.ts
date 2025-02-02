import dayjs from 'dayjs';

export interface appointmentsdata {
    user_id: string;
    user_name: string;
    slot_date: dayjs.Dayjs |null;
    phone_number: string;
    city: string;
    barber: string;
    role_for: string;
}


export type deletedata=Pick<appointmentsdata,  'slot_date' | 'user_id'>;
