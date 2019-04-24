import { User } from '../../models/User';
import { BaseRepository } from 'bases';

class UserRepository extends BaseRepository<User> {

    constructor() {
        super(User);
    }

    public async findByEmail(email): Promise<User[]> {
        return await super.find({ email: email });
    }
}

export default new UserRepository();