import { User } from '../../models/User';
import { Repositorio } from 'bases';

export default class UserRepository extends Repositorio<User> {

    constructor(connection: any) {
        super(User, connection);
    }

    public async buscarPorEmail(email: string): Promise<User> {        
        return await this.buscarUm({ email: email });
    }
}
