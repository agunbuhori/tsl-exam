import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
    
    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async checkBy(filter: any): Promise<Users | undefined> {
        return await this.usersRepository.findOne(filter);
    }

    async create(data: Users): Promise<Users> {
        data.password = await hash(data.password, 10);
        const created = await this.usersRepository.save(data);

        return created;
    }
}
