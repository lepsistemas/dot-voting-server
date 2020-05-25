class CardNotFoundException extends Error {

    constructor() {
        super();
        this.message = 'Card not found.';
    }

}

export default CardNotFoundException;