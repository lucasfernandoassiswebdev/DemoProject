import { Servico } from 'bases';
import UserRepository from './UserRepository';
import { User } from '../../models/User';

export default class UserService extends Servico<User> {
    
    constructor(private connection: any) {
        super(new UserRepository(connection));
    }

    public findByEmail = async (email: string): Promise<User> => {                
        return await new UserRepository(this.connection).buscarPorEmail(email);
    }
}
