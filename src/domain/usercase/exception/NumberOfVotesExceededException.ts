class NumberOfVotesExceededException extends Error {

    constructor() {
        super();
        this.message = 'Number of votes exceeded.';
    }

}

export default NumberOfVotesExceededException;