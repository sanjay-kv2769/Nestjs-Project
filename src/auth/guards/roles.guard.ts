import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorators';

const fakeUser = {
    username: "jam",
    roles: ['ADMIN', 'ENGINEER', 'CHILD'],
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside RolesGuard');

        // const request = context.switchToHttp().getRequest()
        // request.user;

        const requiredRoles = this.reflector.get(Roles, context.getHandler());
        console.log('requiredRoles: ', requiredRoles);
        if (requiredRoles.every(requiredRoles => fakeUser.roles.includes(requiredRoles))) {
            console.log("User has required roles");
            return true;

        }
        return false;
    }

}
