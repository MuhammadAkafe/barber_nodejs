import { GlobalQuery } from "../GlobalQuery";


export class GetAllAppointmentsQuery  extends GlobalQuery{
    private user_id
    constructor(user_id:number | string)
    {
        super()
        this.user_id=user_id
    }

  async  GetAllAppointments()
  {
    try {
        const query = `SELECT select_all_appointments($1)`;
       return  await this.query(query, [this.user_id]);
    } 
    catch (error) 
    {
        throw new Error(`${error}`)
    }

  }


}


