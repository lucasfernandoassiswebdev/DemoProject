import { BaseService } from 'bases';
import UserRepository from './UserRepository';
import { User } from '../../models/User';

export default class UserService extends BaseService<User> {

    constructor(connection: any) {
        super(new UserRepository(connection));
    }

    public findByEmail = async (email: String): Promise<User[]> => {
        return await UserRepository.findByEmail({ email: email });
    }
}
