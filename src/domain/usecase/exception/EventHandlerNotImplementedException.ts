class EventHandlerNotImplementedException extends Error {

    constructor(type: string) {
        super();
        this.message = `Event handler not implemented for type ${type}.`;
    }

}

export default EventHandlerNotImplementedException;