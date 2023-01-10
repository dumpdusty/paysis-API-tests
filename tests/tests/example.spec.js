import { expect } from 'chai'


describe('Operations with numbers', function () {
    const a = 4
    const b = 7
    it('addition works properly', function () {
      expect(a + b).to.eq(11)
    });

    it('subtruction works properly', function (){
        expect (a-b).to.eq(-3)
    })
})