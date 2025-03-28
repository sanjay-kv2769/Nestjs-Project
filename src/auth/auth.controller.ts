import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guards';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // @Post('login')
    // // @UseGuards(AuthGuard('local'))
    // @UseGuards(LocalGuard)
    // login(@Body() authPayload: AuthPayloadDto) {
    //     const user = this.authService.validateUser(authPayload);
    //     // if (!user) throw new HttpException('Invalid credentials', 401);
    //     return user;
    // }

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @Roles(['ADMIN'])
    @UseGuards(JwtAuthGuard, RolesGuard)
    status(@Req() req: Request) {
        console.log("Inside status method");
        console.log("user", req.user);
        return req.user;
    }
}
