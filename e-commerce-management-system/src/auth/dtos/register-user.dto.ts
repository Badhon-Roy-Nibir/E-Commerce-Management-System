import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto{
    @IsString({
        message: "Name should be string.",
    })
    @IsNotEmpty({
        message: "Name cannot be empty."
    })
    name: string;
            
    @IsEmail()
    @IsNotEmpty({
        message: "Email cannot be empty."
    })
    email: string;
        
    @MinLength(8)
    @MaxLength(15)
    @IsNotEmpty({
        message: "Password cannot be empty.",
    })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: 'password should contain one special char, one number, one uppercase and one lowecase letter and minimum 8 char log.',
        },
    )
    password: string; 
        
    
    @IsNotEmpty()
    isActive: boolean;
        
    @IsNotEmpty({
         message: "Role ID cannot be empty"
    })
    @IsNumber()
    roleId: number;
}