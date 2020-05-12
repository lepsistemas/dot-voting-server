import User from '../../model/User';

interface AllUsers {
    
    add(user: User): User;
    
    withUsername(username: string): User;
    
    all(): User[];
}

export default AllUsers;