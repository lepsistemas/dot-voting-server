import RoomRequest from "../presentation/dto/RoomCreationRequest";
import RoomCreationData from "../../domain/usercase/dto/RoomCreationData";

class RequestToRoomCreationData {

    static convert(request: RoomRequest): RoomCreationData {
        const converted: RoomCreationData = {
            name: request.name,
            username: request.username
        }

        return converted;
    }

}

export default RequestToRoomCreationData;