describe('avg calculation',()=>{
    it('calculates avarage', () => {
        const temps = [10,20,30];
        const avg = temps.reduce((sum,temp) => sum + temp, 0) / temps.length;
        expect(avg).toBe(20);
    })
})