import { expect } from 'chai';
import GenerateKey from '../../../src/domain/usercase/GenerateKey';

describe('When generating a key', () => {

    it('should have N characters', () => {
        const generateKey: GenerateKey = new GenerateKey();
        const result: string = generateKey.withSize(8);

        expect(result).to.length(8);
    });
});