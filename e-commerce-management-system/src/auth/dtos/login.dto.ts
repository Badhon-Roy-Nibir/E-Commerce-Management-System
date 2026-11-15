import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty({
        message: "email cannot be Empty!"
    })
    @IsEmail()
    email: string;

    @IsNotEmpty({
        message: "Please give the password"
    })
    @IsString({
        message: "PassWord must be string"
    })
    password: string;
}