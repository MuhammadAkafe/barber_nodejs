import { globalQuery } from '../GlobalQuery';

import { deletedata } from '../../../interfaces/RoleData';

     async function deleteApponiment({user_id: userID, slot_date }:deletedata): Promise<any> 
    {
        try {
            const query = `SELECT delete_appointment($1, $2) `; 
            await globalQuery(query, [userID, slot_date]);
        } 
        catch (error: any) {
            console.error(error);
            throw new Error(`Failed to delete appointment: ${error.message}`);
            
        }
    }
