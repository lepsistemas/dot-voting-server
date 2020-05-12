import RoomRequest from "../presentation/dto/RoomRequest";
import RoomData from "../../domain/usercase/RoomData";

class RequestToRoomData {

    static convert(request: RoomRequest): RoomData {
        const converted: RoomData = {
            name: request.name,
            username: request.username
        }

        return converted;
    }

}

export default RequestToRoomData;