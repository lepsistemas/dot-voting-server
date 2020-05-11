import RoomEntranceRequest from "../presentation/dto/RoomEntranceRequest";
import RoomEntranceData from "../../domain/model/RoomEntranceData";

class RequestToRoomEntranceData {

    static convert(request: RoomEntranceRequest): RoomEntranceData {
        const converted: RoomEntranceData = {
            owner: request.owner,
            name: request.name,
            username: request.username,
        }

        return converted;
    }

}

export default RequestToRoomEntranceData;