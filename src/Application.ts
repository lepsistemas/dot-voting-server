import { Express } from 'express';
import { Server } from 'socket.io';
import { Subject } from 'rxjs';

import Guest from './domain/model/Guest';
import Room from './domain/model/Room';
import Card from './domain/model/Card';

import FetchRoom from './domain/usercase/FetchRoom';
import CreateRoom from './domain/usercase/CreateRoom';
import DeleteRoom from './domain/usercase/DeleteRoom';
import LockerRoom from './domain/usercase/LockerRoom';
import EnterRoom from './domain/usercase/EnterRoom';
import ExitRoom from './domain/usercase/ExitRoom';
import UpdateRoom from './domain/usercase/UpdateRoom';

import CreateCard from './domain/usercase/CreateCard';
import FetchCard from './domain/usercase/FetchCard';

import FetchUser from './domain/usercase/FetchUser';
import CreateUser from './domain/usercase/CreateUser';

import AllRooms from './domain/usercase/collection/AllRooms';
import AllUsers from './domain/usercase/collection/AllUsers';
import AllCards from './domain/usercase/collection/AllCards';
import AllVotes from './domain/usercase/collection/AllVotes';

import GiveVote from './domain/usercase/GiveVote';

import EnterRoomHandler from './domain/usercase/event/EnterRoomHandler';
import ExitRoomHandler from './domain/usercase/event/ExitRoomHandler';
import DeleteRoomHandler from './domain/usercase/event/DeleteRoomHandler';

import RoomController from './infrastructure/presentation/RoomController';
import RoomRequest from './infrastructure/presentation/dto/RoomCreationRequest';
import RoomLockerRequest from './infrastructure/presentation/dto/RoomLockerRequest';

import RoomEntranceController from './infrastructure/presentation/RoomEntranceController';
import RoomEntranceRequest from './infrastructure/presentation/dto/RoomEntranceRequest';

import RoomExitRequest from './infrastructure/presentation/dto/RoomExitRequest';
import RoomExitController from './infrastructure/presentation/RoomExitController';

import UserController from './infrastructure/presentation/UserController';

import CardController from './infrastructure/presentation/CardController';
import CardCreationRequest from './infrastructure/presentation/dto/CardCreationRequest';
import CardsChangedHandler from './domain/usercase/event/CardsChangedHandler';

import VoteController from './infrastructure/presentation/VoteController';
import VoteGivenRequest from './infrastructure/presentation/dto/VoteGivenRequest';

import EventPublisher from './infrastructure/event/EventPublisher';
import EventSubscriber from './infrastructure/event/EventSubscriber';

import AllUsersInMemoryRepository from './infrastructure/repository/AllUsersInMemoryRepository';
import AllRoomsInMemoryRepository from './infrastructure/repository/AllRoomsInMemoryRepository';
import AllCardsInMemoryRepository from './infrastructure/repository/AllCardsInMemoryRepository';
import AllVotesInMemoryRepository from './infrastructure/repository/AllVotesInMemoryRepository';

class Application {

    private userController: UserController;
    private roomController: RoomController;
    private roomEntranceController: RoomEntranceController;
    private roomExitController: RoomExitController;
    private cardController: CardController;
    private voteController: VoteController;

    private allUsers: AllUsers;
    private allRooms: AllRooms;
    private allCards: AllCards;
    private allVotes: AllVotes;

    private createUser: CreateUser;
    private fetchUser: FetchUser;

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private enterRoom: EnterRoom;
    private deleteRoom: DeleteRoom;
    private lockerRoom: LockerRoom;
    private exitRoom: ExitRoom;
    private updateRoom: UpdateRoom;

    private createCard: CreateCard;
    private fetchCard: FetchCard;

    private giveVote: GiveVote;

    private enterRoomHandler: EnterRoomHandler;
    private exitRoomHandler: ExitRoomHandler;
    private deleteRoomHandler: DeleteRoomHandler;
    private cardsChangedHandler: CardsChangedHandler;

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
        this.cardsChangedHandler = new CardsChangedHandler(new EventPublisher<Card>(this.eventBus));
        
        this.allUsers = new AllUsersInMemoryRepository();
        this.allRooms = new AllRoomsInMemoryRepository();
        this.allCards = new AllCardsInMemoryRepository();
        this.allVotes = new AllVotesInMemoryRepository();

        this.fetchUser = new FetchUser(this.allUsers);
        this.createUser = new CreateUser(this.allUsers);

        this.fetchRoom = new FetchRoom(this.allRooms);
        this.createRoom = new CreateRoom(this.createUser, this.allRooms);
        this.deleteRoom = new DeleteRoom(this.deleteRoomHandler, this.allRooms, this.allUsers, this.allCards);
        this.lockerRoom = new LockerRoom(this.allRooms);
        this.enterRoom = new EnterRoom(this.enterRoomHandler, this.createUser, this.allUsers, this.allRooms);
        this.exitRoom = new ExitRoom(this.exitRoomHandler, this.deleteRoom, this.allRooms, this.allUsers);
        this.updateRoom = new UpdateRoom(this.allRooms);

        this.fetchCard = new FetchCard(this.allRooms, this.allCards);
        this.createCard = new CreateCard(this.cardsChangedHandler, this.allRooms, this.allUsers, this.allCards);

        this.giveVote = new GiveVote(this.cardsChangedHandler, this.allVotes, this.allCards, this.allUsers, this.allRooms);

        this.userController = new UserController(this.fetchUser);
        this.roomController = new RoomController(this.fetchRoom, this.createRoom, this.deleteRoom, this.lockerRoom, this.updateRoom);
        this.roomEntranceController = new RoomEntranceController(this.enterRoom);
        this.roomExitController = new RoomExitController(this.exitRoom);
        this.cardController = new CardController(this.fetchCard, this.createCard);
        this.voteController = new VoteController(this.giveVote);
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

        this.http.patch('/api/v1/rooms/:id', (request, response) => {
            const id: number = parseInt(request.params.id);
            const result: any = this.roomController.update(id, request.body);
            this.handleResponse(response, result);
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

        this.http.post('/api/v1/cards', (request, response) => {
            const result: any = this.cardController.create(new CardCreationRequest(request.body));
            this.handleResponse(response, result);
        });

        this.http.get('/api/v1/cards', (request, response) => {
            const roomId: number = Number(request.query['roomId']);
            const result: any = this.cardController.fromRoom(roomId);
            this.handleResponse(response, result);
        });

        this.http.post('/api/v1/votes', (request, response) => {
            const result: any = this.voteController.give(new VoteGivenRequest(request.body));
            this.handleResponse(response, result);
        });

        const subscriber: EventSubscriber = new EventSubscriber(this.socket, this.eventBus);
        subscriber.subscribe();
    }

    private handleResponse(response: any, dto: any): void {
        if (dto && dto.error) {
            console.error(dto.error);
            response.status(dto.error.status);
            response.send(dto);
        } else {
            response.send(dto);
        }
    }

}

export default Application;