import { Router } from 'express';

import RoomController from '../presentation/RoomController';
import RoomRequest from './dto/RoomRequest';
import RoomLockerRequest from './dto/RoomLockerRequest';

import RoomEntranceController from './RoomEntranceController';
import RoomEntranceRequest from './dto/RoomEntranceRequest';

import UserController from './UserController';

import FetchRoom from '../../domain/usercase/FetchRoom';
import CreateRoom from '../../domain/usercase/CreateRoom';
import EnterRoom from '../../domain/usercase/EnterRoom';
import DeleteRoom from '../../domain/usercase/DeleteRoom';
import LockerRoom from '../../domain/usercase/LockerRoom';

import FetchUser from '../../domain/usercase/FetchUser';
import CreateUser from '../../domain/usercase/CreateUser';

import AllRooms from '../../domain/usercase/collection/AllRooms';
import AllRoomsInMemoryRepository from '../repository/AllRoomsInMemoryRepository';

import AllUsers from '../../domain/usercase/collection/AllUsers';
import AllUsersInMemoryRepository from '../repository/AllUsersInMemoryRepository';

class Routes {

    private routes: Router;

    private userController: UserController;
    private roomController: RoomController;
    private roomEntranceController: RoomEntranceController;

    private allUsers: AllUsers;
    private allRooms: AllRooms;

    private createUser: CreateUser;
    private fetchUser: FetchUser;

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private enterRoom: EnterRoom;
    private deleteRoom: DeleteRoom;
    private lockerRoom: LockerRoom;

    constructor() {
        this.routes = Router();
        
        this.allUsers = new AllUsersInMemoryRepository();
        this.allRooms = new AllRoomsInMemoryRepository();

        this.fetchUser = new FetchUser(this.allUsers);
        this.createUser = new CreateUser(this.allUsers);

        this.fetchRoom = new FetchRoom(this.allRooms);
        this.createRoom = new CreateRoom(this.createUser, this.allRooms);
        this.enterRoom = new EnterRoom(this.createUser, this.allUsers, this.allRooms);
        this.deleteRoom = new DeleteRoom(this.allRooms, this.allUsers);
        this.lockerRoom = new LockerRoom(this.allRooms);

        this.userController = new UserController(this.fetchUser);
        this.roomController = new RoomController(this.fetchRoom, this.createRoom, this.deleteRoom, this.lockerRoom);
        this.roomEntranceController = new RoomEntranceController(this.enterRoom);
    }
    
    public create(): Router {

        this.routes.get('/api/v1/users/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            const result: any = this.userController.id(id);
            this.handleResponse(response, result);
        });

        this.routes.get('/api/v1/rooms', (request, response) => {
            let result: any = this.roomController.all();
            this.handleResponse(response, result);
        });

        this.routes.get('/api/v1/rooms/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            const result: any = this.roomController.id(id);
            this.handleResponse(response, result);
        });

        this.routes.post('/api/v1/rooms', (request, response) => {
            const result: any = this.roomController.create(new RoomRequest(request.body));
            this.handleResponse(response, result);
        });

        this.routes.post('/api/v1/rooms-entrance', (request, response) => {
            const result: any = this.roomEntranceController.enter(new RoomEntranceRequest(request.body));
            this.handleResponse(response, result);
        });

        this.routes.delete('/api/v1/rooms/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            this.roomController.delete(id);
            this.handleResponse(response, null);
        });

        this.routes.post('/api/v1/rooms/:id/locker', (request, response) => {
            let roomLockerRequest: RoomLockerRequest = new RoomLockerRequest(request.body);
            roomLockerRequest.id = parseInt(request.params.id);
            const result: any = this.roomController.locker(roomLockerRequest);
            this.handleResponse(response, result);
        });

        return this.routes;
    }

    private handleResponse(response: any, dto: any): void {
        if (dto && dto.error) {
            response.status(dto.error.status);
            response.send(dto);
        } else {
            response.send(dto);
        }
    }

}

export default Routes;