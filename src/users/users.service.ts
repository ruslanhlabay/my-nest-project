import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import  {InjectModel } from "@nestjs/sequelize";
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { banUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles = [role]

        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})

        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})

        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)

            return dto
        }
        throw new HttpException('Користувача або роль не знайдено', HttpStatus.NOT_FOUND)
    }

    async ban(dto: banUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) { throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND)}
        user.banned = true
        user.banReason = dto.banReason
        await user.save()

        return user
    }

}

