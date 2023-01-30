import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

    @ApiProperty({example: 'user1@mail.com', description: 'Пошта користувача'})
    readonly email: string
    @ApiProperty({example: 'qwerty1234', description: 'Пароль користувача'})
    readonly password: string
}