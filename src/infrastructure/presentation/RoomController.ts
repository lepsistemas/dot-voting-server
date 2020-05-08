import RoomResponse from "./dto/RoomResponse";
import RoomRequest from "./dto/RoomRequest";
import ErrorResponse from "./dto/ErrorResponse";

import RequestToRoomData from "../convert/RequestToRoomData";
import RoomToResponse from "../convert/RoomToResponse";

import FetchRoom from "../../domain/usercase/FetchRoom";
import CreateRoom from "../../domain/usercase/CreateRoom";
import RoomData from "../../domain/model/RoomData";
import Room from "../../domain/model/Room";

class RoomController {

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;

    constructor(fetchRoom: FetchRoom, createRoom: CreateRoom) {
        this.fetchRoom = fetchRoom;
        this.createRoom = createRoom;
    }

    public all(): RoomResponse[] {
        const rooms: Room[] = this.fetchRoom.all();
        return rooms.map(room => RoomToResponse.convert(room));
    }

    public id(id: number): RoomResponse | ErrorResponse {
        try {
            const room: Room = this.fetchRoom.by(id);
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

}

export default RoomController;