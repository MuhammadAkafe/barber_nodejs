import { globalQuery } from '../GlobalQuery';




  async function  GetAllAppointments(user_id:number | string)
  {
    try {
        const query = `SELECT select_all_appointments($1)`;
       return  await  globalQuery(query, [user_id]);
    } 
    catch (error) 
    {
        throw new Error(`${error}`)
    }
  }



