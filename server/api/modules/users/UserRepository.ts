import { User } from '../../models/User';
import { BaseRepository } from 'bases';

export default class UserRepository extends BaseRepository<User> {

    constructor(connection: any) {
        super(User, connection);
    }

    public async findByEmail(email: string): Promise<User> {        
        return await this.findOne({ email: email });
    }
}
