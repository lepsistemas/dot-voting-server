import { expect } from 'chai';

import RequestToRoomEntranceData from '../../../src/infrastructure/convert/RequestToRoomEntranceData';

import RoomEntranceRequest from '../../../src/infrastructure/presentation/dto/RoomEntranceRequest'
import RoomEntranceData from '../../../src/domain/usecase/dto/RoomEntranceData';

describe('When converting', () => {

    it('should convert from RoomEntranceRequest to RoomEntranceData', () => {
        const request: RoomEntranceRequest = {
            name: 'room',
            key: '1234',
            username: 'username'
        }
        const result: RoomEntranceData = RequestToRoomEntranceData.convert(request);
    
        expect(result.name).to.be.equal('room');
        expect(result.key).to.be.equal('1234');
        expect(result.username).to.be.equal('username');
    });

});