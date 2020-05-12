import AllUsers from '../../domain/usercase/collection/AllUsers';
import User from '../../domain/model/User';

class AllUsersInMemoryRepository implements AllUsers {

    private users: User[];

    constructor() {
        this.users = [];
    }
    
    add(user: User): User {
        const lastId: number = this.users.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        user.id = lastId + 1;
        this.users.push(user);
        
        return user;
    }

    withUsername(username: string): User {
        return this.users.find(u => u.username === username);
    }

    all(): User[] {
        return this.users;
    }

}

export default AllUsersInMemoryRepository;