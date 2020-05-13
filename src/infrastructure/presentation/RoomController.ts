import RoomResponse from "./dto/RoomResponse";
import RoomRequest from "./dto/RoomRequest";
import RoomLockerRequest from "./dto/RoomLockerRequest";
import ErrorResponse from "./dto/ErrorResponse";

import RequestToRoomData from "../convert/RequestToRoomData";
import RoomToResponse from "../convert/RoomToResponse";
import RequestToRoomLockerData from "../convert/RequestToRoomLockerData";

import RoomLockerData from "../../domain/usercase/RoomLockerData";
import RoomData from "../../domain/usercase/RoomData";

import Room from "../../domain/model/Room";
import FetchRoom from "../../domain/usercase/FetchRoom";
import CreateRoom from "../../domain/usercase/CreateRoom";
import DeleteRoom from "../../domain/usercase/DeleteRoom";
import LockerRoom from "../../domain/usercase/LockerRoom";

class RoomController {

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private deleteRoom: DeleteRoom;
    private lockerRoom: LockerRoom;

    constructor(fetchRoom: FetchRoom, createRoom: CreateRoom, deleteRoom: DeleteRoom, lockerRoom: LockerRoom) {
        this.fetchRoom = fetchRoom;
        this.createRoom = createRoom;
        this.deleteRoom = deleteRoom;
        this.lockerRoom = lockerRoom;
    }

    public all(): RoomResponse[] {
        const rooms: Room[] = this.fetchRoom.all();
        return rooms.map(room => RoomToResponse.convert(room));
    }

    public id(id: number): RoomResponse | ErrorResponse {
        try {
            const room: Room = this.fetchRoom.byId(id);
            return RoomToResponse.convert(room);
        } catch(e) {
            return {
                error: {
                    status: 400,
                    message: e.message
                }
            };
        }
    }

    public create(request: RoomRequest): RoomResponse | ErrorResponse {
        const data: RoomData = RequestToRoomData.convert(request);
        try {
            const room: Room = this.createRoom.with(data);
            return RoomToResponse.convert(room);
        } catch(e) {
            return {
                error: {
                    status: 400,
                    message: e.message
                }
            };
        }
    }

    public delete(id: number): void {
        this.deleteRoom.by(id);
    }

    public locker(request: RoomLockerRequest): RoomResponse | ErrorResponse {
        const data: RoomLockerData = RequestToRoomLockerData.convert(request);
        const room: Room = this.lockerRoom.with(data);
        return RoomToResponse.convert(room);
    }

}

export default RoomController;