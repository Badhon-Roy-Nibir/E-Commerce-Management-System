import { IsNotEmpty, IsString } from "class-validator";

export class CreateRolesDto{

    @IsNotEmpty({
        message: "Name cannot be empty"
    })
    @IsString({
        message: "Name should be string."
    })
    name: string;

    @IsNotEmpty({
        message: "Description cannot be empty"
    })
    @IsString({
        message: "Description should be string."
    })
    description: string;


}