class CardAlreadyVotedException extends Error {

    constructor() {
        super();
        this.message = 'Card has already been voted.';
    }

}

export default CardAlreadyVotedException;