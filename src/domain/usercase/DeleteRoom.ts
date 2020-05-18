import AllRooms from './collection/AllRooms';
import AllUsers from './collection/AllUsers';
import AllCards from './collection/AllCards';

import DeleteRoomHandler from './event/DeleteRoomHandler';

import Room from '../model/Room';
import Card from '../model/Card';

import RoomNotFoundException from './exception/RoomNotFoundException';

class DeleteRoom {

    private handler: DeleteRoomHandler;
    private allRooms: AllRooms;
    private allUsers: AllUsers;
    private allCards: AllCards;

    constructor(handler: DeleteRoomHandler, allRooms: AllRooms, allUsers: AllUsers, allCards: AllCards) {
        this.handler = handler;
        this.allRooms = allRooms;
        this.allUsers = allUsers;
        this.allCards = allCards;
    }

    public by(id: number): void {
        const room: Room = this.allRooms.byId(id);
        if (!room) {
            throw new RoomNotFoundException();
        }

        if (room.guests) {
            room.guests.forEach(guest => this.allUsers.remove(guest.id));
        }
        this.allUsers.remove(room.owner.id);

        const cards: Card[] = this.allCards.belongingTo(room.id);
        cards.forEach(card => this.allCards.remove(card.id));

        this.allRooms.remove(id);

        this.handler.handle(room);
    }

}

export default DeleteRoom;