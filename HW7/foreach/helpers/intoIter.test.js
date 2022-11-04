import { intoIter } from './index';
import LinkedList from '../../../../Structures/src/LinkedList/LinkedList'; // Список из моего репозитория со структурами данных
import ChainedHashMap from '../../../../Structures/src/HashMap/ChainedHashMap'; // Мапа из моего репозитория со структурами данных

describe('intoIter', () => {
    it('iter from number', () => {
        expect([...intoIter(3)]).toEqual([1, 2, 3])

        expect([...intoIter(-3)]).toEqual([-1, -2, -3])

        expect([...intoIter(0)]).toEqual([])
    });

    it('iter from undefined/null', () => {
        expect([...intoIter(undefined)]).toEqual([]);

        expect([...intoIter(null)]).toEqual([]);
    });

    it('infinity iter from boolean', () => {
        const positiveIter = intoIter(true);
        expect(positiveIter.next().value).toEqual(1);
        expect(positiveIter.next().value).toEqual(2);
        expect(positiveIter.next().value).toEqual(3);

        const negativeIter = intoIter(false);
        expect(negativeIter.next().value).toEqual(-1);
        expect(negativeIter.next().value).toEqual(-2);
        expect(negativeIter.next().value).toEqual(-3);
    });

    it('iter from string', () => {
        expect([...intoIter('hello')]).toEqual(['h', 'e', 'l', 'l', 'o']);

        expect([...intoIter('12😀😀21')]).toEqual(['1', '2', '😀', '😀', '2', '1']);

        expect([...intoIter('')]).toEqual([]);
    });

    it('iter from array', () => {
        expect([...intoIter([1, 2, 3])]).toEqual([1, 2, 3]);

        expect([...intoIter([])]).toEqual([]);
    });

    it('iter from different objects with iterator', () => {
        const map = new ChainedHashMap(2);
        map.set('a', 1);
        map.set('b', 2);

        expect([...intoIter(new LinkedList([1, 2]))]).toEqual([1, 2]);
        expect([...intoIter(map)]).toEqual([['a', 1], ['b', 2]]);
    });

    it('iter from invalid value', () => {
        expect([...intoIter({a: 1, b: 2})]).toEqual([]);
    })

    it('iter from iterator', () => {
        expect([...intoIter(intoIter([1,2,3]))]).toEqual([1,2,3]);
        
        const iter = intoIter([1,2,3])
        for (const el of iter) {
            break;
        }
        expect([...intoIter(iter)]).toEqual([2,3]);
    })

    it('iter from generator', () => {
        expect([...intoIter(getGenerator([1,2,3]))]).toEqual([1,2,3]);

        const iter = intoIter(getGenerator([1,2,3]));
        for (const el of iter) {
            break;
        }
        expect([...intoIter(iter)]).toEqual([2,3]);
    })
})


function* getGenerator(iter) {
    yield* iter;
}