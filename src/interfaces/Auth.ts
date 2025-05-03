
export interface Authentication {
     username:string;
     password:string;
     confirm_password:string
     email:string;
     phonenumber:string;
     hashedPassword:string;
}


export type RegisterForm = Pick<Authentication, 'username' | 'email' | 'phonenumber' | 'hashedPassword'>;

