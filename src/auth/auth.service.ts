import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async authenticate(number: string, password: string): Promise<any> {
    let check = await this.usersService.checkBy({number: number});
    if (! check || ! compareSync(password, check.password)) return null;
    return check;
  }
}