import ExitRoom from "../../domain/usercase/ExitRoom";

import ErrorResponse from "./dto/ErrorResponse";
import GuestResponse from "./dto/GuestResponse";
import RoomExitRequest from "./dto/RoomExitRequest";

import RoomExitData from "../../domain/usercase/dto/RoomExitData";

import RequestToRoomExitData from "../convert/RequestToRoomExitData";
import GuestToResponse from "../convert/GuestToResponse";
import Guest from "../../domain/model/Guest";

class RoomExitController {

    private exitRoom: ExitRoom;

    constructor(exitRoom: ExitRoom) {
        this.exitRoom = exitRoom;
    }

    public exit(request: RoomExitRequest): GuestResponse | ErrorResponse {
        const data: RoomExitData = RequestToRoomExitData.convert(request);
        try {
            const guest: Guest = this.exitRoom.with(data);
            return GuestToResponse.convert(guest);
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

export default RoomExitController;