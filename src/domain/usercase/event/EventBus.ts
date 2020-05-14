import EventMessage from "./EventMessage";

interface EventBus<T> {

    publish(message: EventMessage<T>): void;

}

export default EventBus;