import { GlobalQuery } from "./GlobalQuery";

export default class DeleteAllUserQuery extends GlobalQuery{
    constructor(){
        super()
    }

    public async delete_all_users_query(){
        const query = `DELETE FROM users`;
        try {
            const users = await this.query(query);
            return users;
        } 
        catch (error) 
        {
            console.error('Error deleting users:', error);
            throw new Error('Error deleting users');
        }
    }

}