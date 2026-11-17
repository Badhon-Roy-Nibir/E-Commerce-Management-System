import { IsNotEmpty, IsString, MaxLength, Min } from "class-validator";

export class CreateRolesDto{

    @IsNotEmpty({
        message: "Name cannot be empty."
    })
    @IsString({
        message: "Name should be string."
    })
    @MaxLength(20,{
        message: "Guest length must be within 20 charecters."
    })
    name: string;

    @IsNotEmpty({
        message: "Description cannot be empty."
    })
    @IsString({
        message: "Description should be string."
    })
    description: string;


}