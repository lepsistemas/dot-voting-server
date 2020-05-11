import RoomEntranceRequest from "./dto/RoomEntranceRequest";
import RoomEntranceData from "../../domain/model/RoomEntranceData";
import RequestToRoomEntranceData from "../convert/RequestToRoomEntranceData";
import ErrorResponse from "./dto/ErrorResponse";
import RoomEntranceResponse from "./dto/RoomEntranceResponse";
import EnterRoom from "../../domain/usercase/EnterRoom";

class RoomEntranceController {

    private enterRoom: EnterRoom;

    constructor(enterRoom: EnterRoom) {
        this.enterRoom = enterRoom;
    }
    
    public enter(request: RoomEntranceRequest): RoomEntranceResponse | ErrorResponse {
        const data: RoomEntranceData = RequestToRoomEntranceData.convert(request);
        try {
            this.enterRoom.with(data);
            return {};
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