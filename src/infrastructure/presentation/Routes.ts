import { Express } from 'express';
import { Server } from 'socket.io';
import { Subject } from 'rxjs';

import RoomController from '../presentation/RoomController';
import RoomRequest from './dto/RoomRequest';
import RoomLockerRequest from './dto/RoomLockerRequest';

import RoomEntranceController from './RoomEntranceController';
import RoomEntranceRequest from './dto/RoomEntranceRequest';

import Guest from '../../domain/model/Guest';
import Room from '../../domain/model/Room';

import UserController from './UserController';

import FetchRoom from '../../domain/usercase/FetchRoom';
import CreateRoom from '../../domain/usercase/CreateRoom';
import DeleteRoom from '../../domain/usercase/DeleteRoom';
import LockerRoom from '../../domain/usercase/LockerRoom';
import EnterRoom from '../../domain/usercase/EnterRoom';
import ExitRoom from '../../domain/usercase/ExitRoom';

import FetchUser from '../../domain/usercase/FetchUser';
import CreateUser from '../../domain/usercase/CreateUser';

import AllRooms from '../../domain/usercase/collection/AllRooms';
import AllRoomsInMemoryRepository from '../repository/AllRoomsInMemoryRepository';

import AllUsers from '../../domain/usercase/collection/AllUsers';
import AllUsersInMemoryRepository from '../repository/AllUsersInMemoryRepository';

import EnterRoomHandler from '../../domain/usercase/event/EnterRoomHandler';
import ExitRoomHandler from '../../domain/usercase/event/ExitRoomHandler';
import DeleteRoomHandler from '../../domain/usercase/event/DeleteRoomHandler';

import EventPublisher from '../event/EventPublisher';
import EventSubscriber from '../event/EventSubscriber';
import RoomExitRequest from './dto/RoomExitRequest';
import RoomExitController from './RoomExitController';

class Routes {

    private userController: UserController;
    private roomController: RoomController;
    private roomEntranceController: RoomEntranceController;
    private roomExitController: RoomExitController;

    private allUsers: AllUsers;
    private allRooms: AllRooms;

    private createUser: CreateUser;
    private fetchUser: FetchUser;

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private enterRoom: EnterRoom;
    private deleteRoom: DeleteRoom;
    private lockerRoom: LockerRoom;
    private exitRoom: ExitRoom;

    private enterRoomHandler: EnterRoomHandler;
    private exitRoomHandler: ExitRoomHandler;
    private deleteRoomHandler: DeleteRoomHandler;

    private socket: Server;
    private http: Express;
    private eventBus: Subject<any>;

    constructor(http: Express, socket: Server) {
        this.http = http;
        this.socket = socket;
        this.eventBus = new Subject<any>();

        this.enterRoomHandler = new EnterRoomHandler(new EventPublisher<Guest>(this.eventBus));
        this.exitRoomHandler = new ExitRoomHandler(new EventPublisher<Guest>(this.eventBus));
        this.deleteRoomHandler = new DeleteRoomHandler(new EventPublisher<Room>(this.eventBus));
        
        this.allUsers = new AllUsersInMemoryRepository();
        this.allRooms = new AllRoomsInMemoryRepository();

        this.fetchUser = new FetchUser(this.allUsers);
        this.createUser = new CreateUser(this.allUsers);

        this.fetchRoom = new FetchRoom(this.allRooms);
        this.createRoom = new CreateRoom(this.createUser, this.allRooms);
        this.deleteRoom = new DeleteRoom(this.deleteRoomHandler, this.allRooms, this.allUsers);
        this.lockerRoom = new LockerRoom(this.allRooms);
        this.enterRoom = new EnterRoom(this.enterRoomHandler, this.createUser, this.allUsers, this.allRooms);
        this.exitRoom = new ExitRoom(this.exitRoomHandler, this.deleteRoom, this.allRooms, this.allUsers);

        this.userController = new UserController(this.fetchUser);
        this.roomController = new RoomController(this.fetchRoom, this.createRoom, this.deleteRoom, this.lockerRoom);
        this.roomEntranceController = new RoomEntranceController(this.enterRoom);
        this.roomExitController = new RoomExitController(this.exitRoom);
    }
    
    public start(): void {

        this.http.get('/api/v1/users/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            const result: any = this.userController.id(id);
            this.handleResponse(response, result);
        });

        this.http.get('/api/v1/rooms', (request, response) => {
            let result: any = this.roomController.all();
            this.handleResponse(response, result);
        });

        this.http.get('/api/v1/rooms/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            const result: any = this.roomController.id(id);
            this.handleResponse(response, result);
        });

        this.http.post('/api/v1/rooms', (request, response) => {
            const result: any = this.roomController.create(new RoomRequest(request.body));
            this.handleResponse(response, result);
        });

        this.http.delete('/api/v1/rooms/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            this.roomController.delete(id);
            this.handleResponse(response, null);
        });

        this.http.post('/api/v1/rooms/:id/locker', (request, response) => {
            let roomLockerRequest: RoomLockerRequest = new RoomLockerRequest(request.body);
            roomLockerRequest.id = parseInt(request.params.id);
            const result: any = this.roomController.locker(roomLockerRequest);
            this.handleResponse(response, result);
        });

        this.http.post('/api/v1/rooms-entrance', (request, response) => {
            const result: any = this.roomEntranceController.enter(new RoomEntranceRequest(request.body));
            this.handleResponse(response, result);
        });

        this.http.post('/api/v1/rooms-exit', (request, response) => {
            const result: any = this.roomExitController.exit(new RoomExitRequest(request.body));
            this.handleResponse(response, result);
        });
        
        this.socket.on('connection', socket => {

            socket.on('disconnect', () => {
            });
        });

        const subscriber: EventSubscriber = new EventSubscriber(this.socket, this.eventBus);
        subscriber.subscribe();
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