import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import FetchUser from '../../../src/domain/usercase/FetchUser';

import User from '../../../src/domain/model/User';

import AllUsers from '../../../src/domain/usercase/collection/AllUsers';
import UserNotFoundException from '../../../src/domain/usercase/exception/UserNotFoundException';

describe('When fetching all users', () => {

    const allUsers = TypeMoq.Mock.ofType<AllUsers>();

    let fetchUser: FetchUser;

    beforeEach(() => {
        fetchUser = new FetchUser(allUsers.object);
    });

    it('should return empty when there are no users', () => {
        allUsers.setup(mock => mock.all()).returns(() => []);

        const result: User[] = fetchUser.all();

        expect(result).to.be.an('array').that.is.empty;
    });

    it('should return all users', () => {
        const users: User[] = [
            {
                id: 1,
                username: 'username'
            }
        ];
        allUsers.setup(mock => mock.all()).returns(() => users);

        const result: User[] = fetchUser.all();

        expect(result).to.be.equal(users);
    });

});

describe('When fetching user by id', () => {

    const allUsers = TypeMoq.Mock.ofType<AllUsers>();

    let fetchUser: FetchUser;

    beforeEach(() => {
        fetchUser = new FetchUser(allUsers.object);
    });

    it('should throw exception if user does not exist', () => {
        allUsers.setup(mock => mock.byId(1)).returns(() => undefined);

        expect(() => fetchUser.byId(1)).to.throw(UserNotFoundException);
    });

    it('should return the user with given id', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        const result: User = fetchUser.byId(1);

        expect(result).to.be.equal(user);
    });

});

describe('When fetching user by username', () => {

    const allUsers = TypeMoq.Mock.ofType<AllUsers>();

    let fetchUser: FetchUser;

    beforeEach(() => {
        fetchUser = new FetchUser(allUsers.object);
    });

    it('should throw exception if user does not exist', () => {
        allUsers.setup(mock => mock.byUsername('name')).returns(() => undefined);

        expect(() => fetchUser.byUsername('name')).to.throw(UserNotFoundException);
    });

    it('should return the user with given name and key', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        allUsers.setup(mock => mock.byUsername('username')).returns(() => user);

        const result: User = fetchUser.byUsername('username');

        expect(result).to.be.equal(user);
    });

});