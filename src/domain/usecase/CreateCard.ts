import CardCreationData from './dto/CardCreationData';

import Card from '../model/Card';
import Room from '../model/Room';
import User from '../model/User';

import AllUsers from './collection/AllUsers';
import AllRooms from './collection/AllRooms';
import AllCards from './collection/AllCards';

import UserNotFoundException from './exception/UserNotFoundException';
import RoomNotFoundException from './exception/RoomNotFoundException';

import CardsChangedHandler from './event/CardsChangedHandler';

class CreateCard {

    private handler: CardsChangedHandler;
    private allRooms: AllRooms;
    private allUsers: AllUsers;
    private allCards: AllCards;

    constructor(handler: CardsChangedHandler, allRooms: AllRooms, allUsers: AllUsers, allCards: AllCards) {
        this.handler = handler;
        this.allRooms = allRooms;
        this.allUsers = allUsers;
        this.allCards = allCards;
    }

    public with(data: CardCreationData): Card {
        const room: Room = this.allRooms.byId(data.roomId);
        if (!room) {
            throw new RoomNotFoundException();
        }

        const user: User = this.allUsers.byId(data.userId);
        if (!user) {
            throw new UserNotFoundException();
        }

        const card: Card = {
            title: data.title,
            description: data.description,
            author: user,
            room: room,
            votes: 0
        }

        const addedCard: Card = this.allCards.add(card);

        this.handler.handle(addedCard);

        return addedCard;
    }

}

export default CreateCard;