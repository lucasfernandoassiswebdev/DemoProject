import { BaseService } from 'bases';
import UserRepository from './UserRepository';
import { User } from '../../models/User';

class UserService extends BaseService<User> {

    constructor() {
        super(UserRepository);
    }

    public getByEmail = async (email: String): Promise<User[]> => {
        return await UserRepository.findByEmail({ email: email });
    }
}

export default new UserService();
