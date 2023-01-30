import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';


@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Створення користувача'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Отримати всіх користувачів'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.userService.getAllUsers()
    }

}
