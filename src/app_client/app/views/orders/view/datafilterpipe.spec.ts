import { DataFilterPipe } from './datafilterpipe';

fdescribe('DataFilterPipe', () => {
    let pipe: DataFilterPipe;
    beforeEach(() => {
        pipe = new DataFilterPipe();
    });
    const patientArray = [
        { patient: { firstName: 'Kunle' } },
        { patient: { firstName: 'Justice' } },
        { patient: { firstName: 'Brittany' } }
    ]
    it('should return a filtered array when given a query', () => {
        expect(pipe.transform(patientArray, 'Kunle')).toEqual(new Array({
            patient: {
                firstName: 'Kunle'
            }
        }));
    });
    it('should return an empty array when given no query', () => {
        expect(pipe.transform(patientArray, '')).toBe(patientArray);
    });
})
