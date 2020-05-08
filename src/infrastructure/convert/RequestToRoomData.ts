import RoomRequest from "../presentation/dto/RoomRequest";
import RoomData from "../../domain/model/RoomData";

class RequestToRoomData {

    static convert(request: RoomRequest): RoomData {
        const converted: RoomData = {
            name: request.name,
            username: request.username,
            numberOfGuests: request.numberOfGuests
        }

        return converted;
    }

}

export default RequestToRoomData;