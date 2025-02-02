import { Response, Request } from "express";
import DeleteAllUserQuery from "../../database/querys/Admin/deleteAllUserQuery";

export async function DeleteAllUsers(req: Request, res: Response): Promise<Response> 
{
    try {
        const deleteUsers = new DeleteAllUserQuery();
        const result = await deleteUsers.delete_all_users_query();
        return res.status(200).json({ message: "All users have been successfully deleted.", result });
    } 
    catch (error: any) 
    {
        return res.status(500).json({ message: `Error deleting users: ${error.message}` });
    }
}
