import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuards implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findOneByID(request.user.sub);

    return requiredRoles.some((role: any) => user.role?.includes(role));
  }
}
