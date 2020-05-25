import RoomResponse from "./dto/RoomResponse";
import RoomCreationRequest from "./dto/RoomCreationRequest";
import RoomLockerRequest from "./dto/RoomLockerRequest";
import ErrorResponse from "./dto/ErrorResponse";

import RequestToRoomCreationData from "../convert/RequestToRoomCreationData";
import RoomToResponse from "../convert/RoomToResponse";
import RequestToRoomLockerData from "../convert/RequestToRoomLockerData";

import RoomLockerData from "../../domain/usecase/dto/RoomLockerData";
import RoomCreationData from "../../domain/usecase/dto/RoomCreationData";

import Room from "../../domain/model/Room";
import FetchRoom from "../../domain/usecase/FetchRoom";
import CreateRoom from "../../domain/usecase/CreateRoom";
import DeleteRoom from "../../domain/usecase/DeleteRoom";
import LockerRoom from "../../domain/usecase/LockerRoom";
import UpdateRoom from "../../domain/usecase/UpdateRoom";

import RoomUpdateData from "../../domain/usecase/dto/RoomUpdateData";

class RoomController {

    private fetchRoom: FetchRoom;
    private createRoom: CreateRoom;
    private deleteRoom: DeleteRoom;
    private lockerRoom: LockerRoom;
    private updateRoom: UpdateRoom;

    constructor(fetchRoom: FetchRoom, createRoom: CreateRoom, deleteRoom: DeleteRoom, lockerRoom: LockerRoom, updateRoom: UpdateRoom) {
        this.fetchRoom = fetchRoom;
        this.createRoom = createRoom;
        this.deleteRoom = deleteRoom;
        this.lockerRoom = lockerRoom;
        this.updateRoom = updateRoom;
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

    public create(request: RoomCreationRequest): RoomResponse | ErrorResponse {
        const data: RoomCreationData = RequestToRoomCreationData.convert(request);
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

    public update(id: number, body: any): RoomResponse | ErrorResponse {
        try {
            let data: RoomUpdateData = {};
            if (body.numberOfVotes) {
                data.numberOfVotes = Number(body.numberOfVotes);
            }
            if (body.allowMultipleVotesPerCard !== undefined) {
                data.allowMultipleVotesPerCard = body.allowMultipleVotesPerCard === false ? false : true;
            }
            if (body.showResults !== undefined) {
                data.showResults = body.showResults === false ? false : true;
            }
            const room: Room = this.updateRoom.with(id, data);
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