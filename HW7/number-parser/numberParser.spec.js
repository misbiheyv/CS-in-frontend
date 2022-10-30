import numberParser from "./NumberParser";

describe('numberParser', () => {

    it('should be parsed', () => {
        const parser = numberParser()

        parser.next('-');
        parser.next('14');
        parser.next('.');
        parser.next('53');
        parser.next('e-');

        expect(parser.next('44')).toEqual({value: '-14.53e-44', done: false})

        expect(parser.return()).toEqual({value: -14.53e-44, done: true})
    })

    it('should throw error and set done true', () => {
        const parser = numberParser()

        parser.next('-');

        expect(() => parser.next('-4')).toThrow('Invalid number');

        expect(parser.next('1')).toEqual({done: true, value: undefined})
    })

    it('should be parsed but should not be converted to number', () => {
        const parser = numberParser()

        parser.next('');

        expect(parser.return()).toEqual({done: true, value: NaN})
    })
})