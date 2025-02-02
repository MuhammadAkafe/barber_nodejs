import barber from "../../../interfaces/Barber";
import { GlobalQuery } from "../GlobalQuery";

export class add_barber_query extends GlobalQuery
{

    private email;
    private password;
    private barber;
    private phone_number;
    private opening_time;
    private closing_time;
    private city;



    constructor({email,password,barber,city,phone_number,opening_time,closing_time}:Partial<barber>)
    {
        super()
        this.email=email;
        this.password=password;
        this.barber=barber;
        this.city=city;
        this.phone_number=phone_number;
        this.opening_time=opening_time;
        this.closing_time=closing_time;

        if(!(this.email || this.password || this.barber || this.city || this.phone_number || this.opening_time || this.closing_time))
            {
                throw new Error(`fields are required`);
            }
        
    }

    async add_barber():Promise<any |Record<any,string>>
    {
        const query = `SELECT add_barber($1,$2,$3,$4,$5,$6,$7)`;
        try {
            const result = await this.query(query, [
                this.email,
                this.password,
                this.barber,
                this.city,
                this.phone_number,
                this.opening_time,
                this.closing_time
            ]);
            return { success: true, data: result };
        } 
        catch (error: any) 
        {
            throw new Error(`Failed to add barber: ${error.message}`);
        }
    }
}