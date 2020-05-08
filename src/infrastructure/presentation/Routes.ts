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

        this.routes.get('/api/v1/rooms', (req, res) => {
            const response: any = this.roomController.all();
            res.send(response);
        });

        this.routes.post('/api/v1/rooms', (req, res, next) => {
            const response: any = this.roomController.create(new RoomRequest(req.body));
            if (response.error) {
                res.status(response.error.status);
                res.send(response);
            } else {
                res.send(response);
            }
        });

        return this.routes;
    }

}

export default Routes;