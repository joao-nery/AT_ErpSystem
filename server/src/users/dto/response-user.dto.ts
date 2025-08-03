import { User } from '../entities/user.entity';

export class ResponseUserDto {
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updateAt: Date;
  readonly role?: string;

  constructor(user: User) {
    (user.email, user.name, user.createAt, user.updateAt, user.role);
  }
}
