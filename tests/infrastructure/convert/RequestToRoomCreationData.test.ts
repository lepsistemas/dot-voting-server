import { expect } from 'chai';

import RequestToRoomCreationData from '../../../src/infrastructure/convert/RequestToRoomCreationData';

import RoomCreationRequest from '../../../src/infrastructure/presentation/dto/RoomCreationRequest'
import RoomCreationData from '../../../src/domain/usecase/dto/RoomCreationData';

describe('When converting', () => {

    it('should convert from RoomCreationRequest to RoomCreationData', () => {
        const request: RoomCreationRequest = {
            name: 'room',
            username: 'username'
        }
        const result: RoomCreationData = RequestToRoomCreationData.convert(request);
    
        expect(result.name).to.be.equal('room');
        expect(result.username).to.be.equal('username');
    });

});