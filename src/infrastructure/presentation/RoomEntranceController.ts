import EnterRoom from "../../domain/usercase/EnterRoom";
import RoomEntrance from "../../domain/model/RoomEntrance";
import RoomEntranceData from "../../domain/usercase/RoomEntranceData";

import RequestToRoomEntranceData from "../convert/RequestToRoomEntranceData";
import RoomEntranceToResponse from "../convert/RoomEntranceToResponse";

import RoomEntranceRequest from "./dto/RoomEntranceRequest";
import RoomEntranceResponse from "./dto/RoomEntranceResponse";
import ErrorResponse from "./dto/ErrorResponse";

class RoomEntranceController {

    private enterRoom: EnterRoom;

    constructor(enterRoom: EnterRoom) {
        this.enterRoom = enterRoom;
    }
    
    public enter(request: RoomEntranceRequest): RoomEntranceResponse | ErrorResponse {
        const data: RoomEntranceData = RequestToRoomEntranceData.convert(request);
        try {
            const entrance: RoomEntrance = this.enterRoom.with(data);
            return RoomEntranceToResponse.convert(entrance);
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