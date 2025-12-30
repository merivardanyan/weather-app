const {getweatherAPI} = require('../src/weatherAPI');
global.fetch = jest.fn();
describe('getweatherAPI', () => {
    it('returns temperature and windspeed', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                results:[{
                    latgititude: 40,
                    logitude: 44
                }]
            })
        }).mockResolvedValueOnce({
            json: async () => ({
                current_weather:{
                    temperature: 25,
                    windspeed: 10
                }
            })
        })
        const result = await getweatherAPI('Yerevan');
        expect(result.temperature).toBe(25);
        expect(result.windspeed).toBe(10);
    });
})