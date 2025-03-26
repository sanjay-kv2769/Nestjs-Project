import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Sam",
            "email": "sam@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Alice",
            "email": "alice@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "John",
            "email": "john@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Emma",
            "email": "emma@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 5,
            "name": "Michael",
            "email": "michael@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 6,
            "name": "Sophia",
            "email": "sophia@gmail.com",
            "role": "INTERN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException(`User with ${role} not found`)
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException(`User with ${id} not found`)
        return user
    }

    // create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id)
    //     const newUser = { id: usersByHighestID[0].id + 1, ...user }
    //     this.users.push(newUser)
    //     return newUser
    // }
    create(createUserDto: CreateUserDto) {
        const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = { id: usersByHighestID[0].id + 1, ...createUserDto }
        this.users.push(newUser)
        return newUser
    }

    // update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    //     this.users = this.users.map(user => {
    //         if (user.id === id) {
    //             return { ...user, ...updatedUser }
    //         }
    //         return user
    //     })
    //     return this.findOne(id)

    // }
    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto }
            }
            return user
        })
        return this.findOne(id)

    }

    delete(id: number) {
        const user = this.users.find(user => user.id === id)
        this.users = this.users.filter(user => user.id !== id)
        return user
    }
}
