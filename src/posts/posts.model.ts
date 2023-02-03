import { ApiProperty } from "@nestjs/swagger"
import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript"
import { User } from "../users/user.model"

interface PostCreationAttrs {
    title: string
    content: string
    userId: number
    image: string

}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

    @ApiProperty({example: '1', description: 'Унікальний ідентифікатор'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true})
        id: number

    @ApiProperty({example: 'Назва поста', description: 'Назва(заголовок) поста'})
    @Column({
        type: DataType.STRING,
        allowNull: false})
        title: string

    @ApiProperty({example: 'Тут може бути довільний текст', description: 'Текст(контент) поста '})
    @Column({
        type: DataType.STRING,
        allowNull: false})
        content: string

    @ApiProperty({example: 'https://somesite.com/myimage.jpg', description: 'Адреса зображення'})
    @Column({
        type: DataType.STRING,
        allowNull: false})
        image: string


    @ForeignKey(() => User)
    @Column( {
        type: DataType.INTEGER
        })
        userId: number

    @BelongsTo( () => User)
        author: User

}