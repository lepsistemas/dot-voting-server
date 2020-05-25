import EnterRoom from "../../domain/usecase/EnterRoom";
import Guest from "../../domain/model/Guest";
import RoomEntranceData from "../../domain/usecase/dto/RoomEntranceData";

import RequestToRoomEntranceData from "../convert/RequestToRoomEntranceData";
import GuestToResponse from "../convert/GuestToResponse";

import RoomEntranceRequest from "./dto/RoomEntranceRequest";
import ErrorResponse from "./dto/ErrorResponse";
import GuestResponse from "./dto/GuestResponse";

class RoomEntranceController {

    private enterRoom: EnterRoom;

    constructor(enterRoom: EnterRoom) {
        this.enterRoom = enterRoom;
    }
    
    public enter(request: RoomEntranceRequest): GuestResponse | ErrorResponse {
        const data: RoomEntranceData = RequestToRoomEntranceData.convert(request);
        try {
            const guest: Guest = this.enterRoom.with(data);
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

export default RoomEntranceController;