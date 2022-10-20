import iter from './iter';

describe('string iterator, like a native', () => {
    test('smile with surrogat pair', () => {
        expect([...iter('😀')]).toEqual(['😀'])
    })

    test('mixed string with regular chars and 2 bytes smiles', () => {
        expect([...iter('12😀😀21')]).toEqual(['1', '2', '😀', '😀', '2', '1'])
    })
})