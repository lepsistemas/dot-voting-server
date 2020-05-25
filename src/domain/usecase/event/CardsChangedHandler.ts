import Card from '../../model/Card';
import EventBus from './EventBus';
import EventMessage from './EventMessage';

class CardsChangedHandler {

    private static KEY: string = 'CARDS-CHANGED';

    private eventBus: EventBus<Card>

    constructor(eventBus: EventBus<Card>) {
        this.eventBus = eventBus;
    }

    public handle(data: Card): void {
        const message: EventMessage<Card> = {
            key: `ROOM:${data.room.id}_${CardsChangedHandler.KEY}`,
            data: data
        }
        this.eventBus.publish(message);
    }

}

export default CardsChangedHandler;