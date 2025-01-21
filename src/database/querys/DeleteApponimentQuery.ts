import { GlobalQuery } from './GlobalQuery';

export default class deleteApponiment extends GlobalQuery 
{
    constructor() {
        super();
    }

    public async deleteApponiment(userID: string, date: Date): Promise<any> {
        try {
            const query = `SELECT delete_appointment($1, $2) as success`; ;
            const result = await this.query(query, [userID, date]);
            const success = result.rows[0]?.success;
            if (!success) 
              {
              return ({ message: "No appointment found to delete.", isApponimentDeleted: false });
            }
            else {
                return ({ message: "Appointment successfully deleted.", isApponimentDeleted: true });       
            }
        } 
        catch (error: any) {
            console.error(error);
            throw new Error(`Failed to delete appointment: ${error.message}`);
            
        }
    }
}