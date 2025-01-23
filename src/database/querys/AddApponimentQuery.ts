import { RoleData } from '../../interfaces/RoleData';
import { GlobalQuery } from './GlobalQuery';
import dayjs from 'dayjs';



export default class AddApponiment extends GlobalQuery {

    public userID: string |number;      
    public userName: string;
    public slot_date:dayjs.Dayjs |null;
    public city: string;
    public barber: string;
    public phoneNumber: string;
    public roleFor: string;



    constructor({userID, userName, slot_date, city, barber, phoneNumber, roleFor}:RoleData) {
        super();
        this.userID= userID;
        this.userName = userName;   
        this.slot_date = slot_date;
        this.city = city;
        this.barber = barber;
        this.phoneNumber = phoneNumber;
        this.roleFor = roleFor;
    }


    public async AddApponiment(): Promise<any> 
    {
        try {
            const query = `SELECT add_appointment($1, $2, $3, $4, $5, $6, $7)`;
            return  this.query(query, [this.userID, this.userName, this.slot_date, this.city, this.barber, this.phoneNumber, this.roleFor]);
        } 
        catch (error: any) {
            console.error(error);
            throw new Error(`Failed to book appointment: ${error.message}`);
        }
    }
}