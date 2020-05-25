interface EventMessage<T> {

    key: string;
    data: T;

}

export default EventMessage;