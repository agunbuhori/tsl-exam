import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
    
    async findAll(query): Promise<any> {
        const perPage = query.per_page > 100 ? 100 : query.per_page;

        const [data, total] = await this.usersRepository.findAndCount({
            take: perPage,
            skip: 0
        });

        return {
            data, total, perPage
        }
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
