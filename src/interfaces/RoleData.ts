import dayjs from 'dayjs';

export interface RoleData {
    userID: string;
    userName: string;
    slot_date: dayjs.Dayjs |null;
    phoneNumber: string;
    city: string;
    barber: string;
    roleFor: string;
}
