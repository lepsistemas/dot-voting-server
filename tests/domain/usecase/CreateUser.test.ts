import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import CreateUser from '../../../src/domain/usecase/CreateUser';

import AllUsers from '../../../src/domain/usecase/collection/AllUsers';

import UserData from '../../../src/domain/usecase/dto/UserData';

import User from '../../../src/domain/model/User';

import UserAlreadyExistsException from '../../../src/domain/usecase/exception/UserAlreadyExistsException';

describe('When creating a user', () => {

    const allUsers = TypeMoq.Mock.ofType<AllUsers>();

    let createUser: CreateUser;

    beforeEach(() => {
        createUser = new CreateUser(allUsers.object);
    });

    it('should throw exception when user already exists with given username', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        allUsers.setup(mock => mock.withUsername('username')).returns(() => user);
        
        const data: UserData = {
            username: 'username',
            admin: true
        }
        expect(() => createUser.with(data)).to.throw(UserAlreadyExistsException);
    });

    it('should return the created user', () => {
        allUsers.setup(mock => mock.withUsername('username')).returns(() => undefined);

        const user: User = {
            username: 'username'
        }
        const addedUser: User = {
            id: 1,
            username: 'username'
        }
        allUsers.setup(mock => mock.add(user)).returns(() => addedUser);
        
        const data: UserData = {
            username: 'username',
            admin: true
        }
        const result: User = createUser.with(data);

        expect(result).to.be.equal(addedUser);
    });

});