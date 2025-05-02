import { appointmentsdata } from '../../../interfaces/RoleData';
import { globalQuery } from '../GlobalQuery';



     async function  addAppointment(form_data: appointmentsdata): Promise<any> {
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
