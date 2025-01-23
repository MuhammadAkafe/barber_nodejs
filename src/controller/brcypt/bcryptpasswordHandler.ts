import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();




export default class bcryptPasswordHandler 
{
  private Password: string;
  private hashedPassword?: string;
  constructor(password:string,hashedpassword?:string)
  {
    this.Password=password
    this.hashedPassword=hashedpassword
  }
    async hashPassword(): Promise<string > {

      return  bcrypt.hash(this.Password, 10)
    }
  
    // Compare passwords
    async comparePasswords(): Promise<boolean> 
    {
        if (!this.hashedPassword) {
            throw new Error('Hashed password is not provided');
        }
        return bcrypt.compare(this.Password, this.hashedPassword);
    }
  
}

