import { Squeal } from './squeal';

describe('squeal api', () => {
    it('should make a squeal', () => {
		console.log('just ran');
        expect(new Squeal()).toBeFalsy();
    });
});