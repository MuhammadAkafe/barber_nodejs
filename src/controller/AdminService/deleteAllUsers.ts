import { Response, Request } from "express";

import DeleteAllUserQuery from "../../database/querys/deleteAllUserQuery";


  export async function  DeleteAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const deleteUsers=new DeleteAllUserQuery()
     const  users=deleteUsers.delete_all_users_query();
      return res.status(200).json({ message: "All users have been successfully deleted.",users:users });
    } 
    catch (error: any) {
      // Handle errors and provide detailed feedback
      return res.status(500).json({ message: `Error deleting all users: ${error.message}` });
    }
}
