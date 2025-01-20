import { Response, Request } from "express";
import { GlobalQuery } from "../../database/querys/GlobalQuery";
import dayjs from 'dayjs';

interface RoleData {
    userID: string;
    userName: string;
    date: dayjs.Dayjs |null;
    phoneNumber: string;
    city: string;
    barber: string;
    roleFor: string;
}

export default class AddRole extends GlobalQuery {
    constructor() {
        super();
    }

    public async AddRole(req: Request, res: Response) {
        try {
            const { userID, userName, phoneNumber, city, barber, roleFor, date }: RoleData = req.body;
            if (!userID || !userName || !phoneNumber || !city || !barber || !roleFor || !date) {
                return res.status(400).json({ message: "All fields are required." });
            }
           
            const query = `SELECT add_appointment($1, $2, $3, $4, $5, $6,$7)`;

            await this.query(query, [userID, userName, date, city, barber, phoneNumber, roleFor]);
            return res.status(200).json({ message: "Appointment successfully booked." });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: `Failed to book appointment: ${error.message}` });
        }
    }
}