import { Subject } from 'rxjs';
import { Server } from 'socket.io';
import EventMessage from '../../domain/usercase/event/EventMessage';

class EventSubscriber {

    private io: Server;
    private eventBus: Subject<any>;

    constructor(io: Server, eventBus: Subject<any>) {
        this.io = io;
        this.eventBus = eventBus;
    }

    public subscribe(): void {
        this.eventBus.subscribe(message => {
            this.io.emit(message.key, JSON.stringify(message.data));
        });
    }

}

export default EventSubscriber;