import { expect } from 'chai';

import Card from '../../../src/domain/model/Card'
import User from '../../../src/domain/model/User';
import Room from '../../../src/domain/model/Room';

import RequestToCardCreationData from '../../../src/infrastructure/convert/RequestToCardCreationData';
import CardCreationData from '../../../src/domain/usecase/dto/CardCreationData';
import CardCreationRequest from '../../../src/infrastructure/presentation/dto/CardCreationRequest';

describe('When converting', () => {

    it('should convert from CardCreationRequest to CardCreationData', () => {
        const request: CardCreationRequest = {
            roomId: 1,
            userId: 2,
            title: 'Title',
            description: 'Description'
        }
        const result: CardCreationData = RequestToCardCreationData.convert(request);

        expect(result.roomId).to.be.equal(1);
        expect(result.userId).to.be.equal(2);
        expect(result.title).to.be.equal('Title');
        expect(result.description).to.be.equal('Description');
    });

});