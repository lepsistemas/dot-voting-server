import Room from "../../../domain/model/Room";

interface AllRooms {

    get(): Room[];

    byId(id: number): Room;

    byOwnerAndName(owner: string, name: string): Room;
    
    add(room: Room): Room;

    put(id: number, room: Room): void;
}

export default AllRooms;