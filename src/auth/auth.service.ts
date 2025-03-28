import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';


const fakeUsers = [{
    id: 1,
    username: "sam",
    password: "sam123"
}, {
    id: 2,
    username: "john",
    password: 'john123'
}]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    validateUser({ username, password }: AuthPayloadDto) {
        console.log("Hello from auth service");
        
        const findUser = fakeUsers.find((user) => user.username === username);
        if (!findUser) return null;
        if (password === findUser.password) {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user);
        }
    }
}
