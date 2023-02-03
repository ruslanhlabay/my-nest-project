import { Controller, Get, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { banUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from '../pipes/validation.pipe';


@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    
    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Створення користувача'})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Отримати всіх користувачів'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('USER')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Видати роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @ApiOperation({summary: 'Забанити користувача'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: banUserDto) {
        return this.usersService.ban(dto)
    }
}
