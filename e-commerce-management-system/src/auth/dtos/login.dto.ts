import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginUserDto{
    @IsNotEmpty({
        message: "ID is Empty!"
    })
    @IsNumber()
    id: number;

    @IsNotEmpty({
        message: "Please give the password"
    })
    @IsString({
        message: "PassWord must be string"
    })
    password: string;
}