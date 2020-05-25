import Room from "../../model/Room";

interface AllRooms {

    all(): Room[];

    byId(id: number): Room;

    byNameAndKey(name: string, key: string): Room;
    
    add(room: Room): Room;

    put(id: number, room: Room): void;

    remove(id: number): void;
}

export default AllRooms;