import { EntityRepository, Repository } from 'typeorm';
import { RegisterDto } from './dto/register-user.dto';
import { UsersEntity } from './users.entity';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  async register(dto: RegisterDto): Promise<UsersEntity> {
    const user = new UsersEntity();
    user.email = dto.email;
    user.password = dto.password;
    return this.save(user);
  }

  async findUser(email: string): Promise<UsersEntity> {
    return this.findOne({ email });
  }
}
