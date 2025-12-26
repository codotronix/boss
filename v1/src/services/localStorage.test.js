import ls from "./localStorage";

describe('Test LocalStorage Service', () => {

    it('Should test set, get and clear of localstorage service', () => {
        let a = { n: 9 }
        let k = "BOSS/TEST"
        // Test 1: set and get
        ls.set(k, a)
        // get
        let a1 = ls.get(k)
        // expect
        expect(a1).toStrictEqual(a)

        // Test 2: Update
        a = { n: 10, m: 99 }
        ls.set(k, a)
        // get
        let a2 = ls.get(k)
        // expect
        expect(a2).toStrictEqual(a)

        // Test 3 Clear
        ls.clear(k)
        let a3 = ls.get(k)
        expect(a3).toBeNull()
    })

})