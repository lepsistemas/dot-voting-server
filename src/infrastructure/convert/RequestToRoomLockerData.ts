import RoomLockerData from "../../domain/usercase/dto/RoomLockerData";
import RoomLockerRequest from "../presentation/dto/RoomLockerRequest";

class RequestToRoomLockerData {

    static convert(request: RoomLockerRequest): RoomLockerData {
        const converted: RoomLockerData = {
            id: request.id,
            lock: request.lock === false ? false : true
        }

        return converted;
    }

}

export default RequestToRoomLockerData;