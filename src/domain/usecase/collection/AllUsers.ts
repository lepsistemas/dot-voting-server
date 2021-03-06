import User from '../../model/User';

interface AllUsers {
    
    add(user: User): User;
    
    withUsername(username: string): User;
    
    all(): User[];
    
    byId(id: number): User;
    
    byUsername(username: string): User;
    
    remove(id: number): void;
}

export default AllUsers;