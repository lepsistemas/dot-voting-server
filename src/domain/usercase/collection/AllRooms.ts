import Room from "../../../domain/model/Room";

interface AllRooms {

    get(): Room[];
    
    add(room: Room): Room;
}

export default AllRooms;