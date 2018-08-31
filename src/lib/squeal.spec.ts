import { Squeal } from './squeal';

describe('squeal api', () => {
    it('should make a squeal', () => {
        expect(new Squeal()).toBeTruthy();
    });
});