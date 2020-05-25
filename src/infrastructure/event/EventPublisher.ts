import { Subject } from 'rxjs';
import EventBus from '../../domain/usecase/event/EventBus';
import EventMessage from '../../domain/usecase/event/EventMessage';

class EventPublisher<T> implements EventBus<T> {

    private eventBus: Subject<any>;

    constructor(eventBus: Subject<any>) {
        this.eventBus = eventBus;
    }
    
    publish(message: EventMessage<T>): void {
        this.eventBus.next(message);
    }

}

export default EventPublisher;