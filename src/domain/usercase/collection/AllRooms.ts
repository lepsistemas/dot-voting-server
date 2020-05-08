import Room from "../../../domain/model/Room";

interface AllRooms {

    get(): Room[];

    by(id: number): Room;
    
    add(room: Room): Room;
}

export default AllRooms;