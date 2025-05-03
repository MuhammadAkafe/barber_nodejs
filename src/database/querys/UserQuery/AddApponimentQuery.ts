import { AppointmentsData } from '../../../interfaces/AppointmentsData';
import { globalQuery } from '../GlobalQuery';



     export async function  addAppointmentQuery(form_data: AppointmentsData): Promise<any> {
        try {
            const query = `SELECT add_appointment($1, $2, $3, $4, $5, $6, $7)`;
            return await  globalQuery(query, [
                form_data
            ]);
        } 
        catch (error: any) 
        {
            console.error('Error adding appointment:', error);
            throw new Error(`${error.message}`);
        }
}
