import { ApiProperty } from "@nestjs/swagger"
import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript"
import { Role } from "src/roles/roles.model"
import { UserRoles } from "src/roles/user-roles.model"

interface UserCreationAttrs {
    email: string
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Унікальний ідентифікатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true})
    id: number

    @ApiProperty({example: 'user@mail.com', description: 'Поштова адреса користувача'})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false})
    email: string

    @ApiProperty({example: 'qwerty1234', description: 'Пароль користувача'})
    @Column({
        type: DataType.STRING,
        allowNull: false})
    password: string

    @ApiProperty({example: 'true', description: 'Користувача забанено чи ні'})
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false})
    banned: boolean

    @ApiProperty({example: 'За образливі висловлювання', description: 'Причина блокування користувача'})
    @Column({type: DataType.STRING,
    allowNull: true})
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

}