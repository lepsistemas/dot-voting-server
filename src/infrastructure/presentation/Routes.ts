import { Router } from 'express';

import RoomController from '../presentation/RoomController';
import RoomRequest from './dto/RoomRequest';

import FetchRoom from '../../domain/usercase/FetchRoom';
import CreateRoom from '../../domain/usercase/CreateRoom';
import AllRooms from '../../domain/usercase/collection/AllRooms';

import AllRoomsInMemoryRepository from '../repository/AllRoomsInMemoryRepository';

class Routes {

    private routes: Router;

    private roomController: RoomController;
    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private allRooms: AllRooms;

    constructor() {
        this.routes = Router();
        
        this.allRooms = new AllRoomsInMemoryRepository();
        this.fetchRoom = new FetchRoom(this.allRooms);
        this.createRoom = new CreateRoom(this.allRooms);
        this.roomController = new RoomController(this.fetchRoom, this.createRoom);
    }
    
    public create(): Router {

        this.routes.get('/api/v1/rooms', (request, response) => {
            const result: any = this.roomController.all();
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

        return this.routes;
    }

    private handleResponse(response: any, dto: any): void {
        if (dto.error) {
            response.status(dto.error.status);
            response.send(dto);
        } else {
            response.send(dto);
        }
    }

}

export default Routes;