import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {

    @ApiProperty({example: 'user1@mail.com', description: 'Пошта користувача'})
    @IsString({message: 'Повинно бути рядком'})
    @IsEmail({}, {message: 'Некоректний email'})
    readonly email: string
    
    @ApiProperty({example: 'qwerty1234', description: 'Пароль користувача'})
    @IsString({message: 'Повинно бути рядком'})
    @Length(4,16, {message: 'Не менше 4 і не більше 16 символів'})
    readonly password: string
}