import { Body, Controller, Delete, Get, Param, ParseIntPipe, ValidationPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('users')
export class UsersController {

    constructor(private readonly UsersService: UsersService) { }

    @Get() //GET /users or /users?role=value
    @Roles(['ADMIN','ENGINEER'])
    @UseGuards(RolesGuard)
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.UsersService.findAll(role)
    }

    // @Get('interns') // GET /users/interns
    // findAllInterns() {
    //     return []
    // }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.findOne(id)
    }

    // @Post('') // POST /users
    // create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     return this.UsersService.create(user)
    // }
    @Post('') // POST /users  
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.UsersService.create(createUserDto)
    }

    // @Patch(':id') // PATCH /users/:id
    // update(@Param('id', ParseIntPipe) id: number, @Body() updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     return this.UsersService.update(+id, updatedUser)
    // }
    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.UsersService.update(+id, updateUserDto)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.UsersService.delete(+id)
    }

}
