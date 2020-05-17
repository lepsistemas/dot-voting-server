import RoomExitRequest from "../presentation/dto/RoomExitRequest";
import RoomExitData from "../../domain/usercase/dto/RoomExitData";

class RequestToRoomExitData {

    static convert(request: RoomExitRequest): RoomExitData {
        const converted: RoomExitData = {
            id: request.id,
            userId: request.userId
        }

        return converted;
    }

}

export default RequestToRoomExitData;