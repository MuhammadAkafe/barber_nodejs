import { GlobalQuery } from "../GlobalQuery";

export default class DeleteAllUserQuery extends GlobalQuery {
    constructor() {
        super();
    }

    public async delete_all_users_query() {
        const query = `DELETE FROM users8`;
        try {
            const result = await this.query(query);
            return result;
        } 
        catch (error:any) 
        {
            throw new Error(`${error.message}`);
        }
    }
}