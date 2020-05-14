import RoomEntranceRequest from "../presentation/dto/RoomEntranceRequest";
import RoomEntranceData from "../../domain/usercase/dto/RoomEntranceData";

class RequestToRoomEntranceData {

    static convert(request: RoomEntranceRequest): RoomEntranceData {
        const converted: RoomEntranceData = {
            name: request.name,
            key: request.key,
            username: request.username,
        }

        return converted;
    }

}

export default RequestToRoomEntranceData;