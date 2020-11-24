import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async authenticate(username: string, password: string): Promise<any> {
    let check = await this.usersService.checkBy({username, isActive: 1});

    if (! check) return null;
    return check;
  }
}