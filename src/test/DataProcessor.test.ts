import { expect } from 'chai';
import { DataProcessor } from '../DataProcessor';
import { dataFromPage, withoutScoreCollection } from './dummyData';

describe('DataProcessor', () => {

    const dataProcessor = new DataProcessor(dataFromPage);

    it('Constructor', () => {
        expect(dataProcessor).to.be.instanceOf(DataProcessor);
    });

    it('Format data', () => {

        expect(dataProcessor.data.size).to.equal(dataFromPage.metaData.length);
    });

    it('Filter by Long WordNum (Positive)', () => {

        const filtered = dataProcessor.filterByWordsInTitleSortByComments(Number.MAX_SAFE_INTEGER + 1);

        expect(filtered).to.be.instanceOf(Map);
        expect(filtered.size).to.equal(0);
    });

    it('Filter by Long WordNum (Negative)', () => {

        const exception = () => {
            dataProcessor.filterByWordsInTitleSortByComments(Number.MIN_SAFE_INTEGER);
        };

        expect(exception).to.throw(Error, 'Words number not accepted');
    });

    it('Filter by Negative WordNum (Positive)', () => {

        const filtered = dataProcessor.filterByWordsInTitleSortByScore(Number.MAX_SAFE_INTEGER + 1);

        expect(filtered).to.be.instanceOf(Map);
        expect(filtered.size).to.equal(dataProcessor.data.size);
    });

    it('Filter by Negative WordNum (Negative)', () => {

        const exception = () => {
            dataProcessor.filterByWordsInTitleSortByScore(Number.MIN_SAFE_INTEGER);
        }

        expect(exception).to.throw(Error, 'Words number not accepted');
    });


    it('Sort by comments ascending with 0', () => {
        const sorted = dataProcessor.filterByWordsInTitleSortByComments(0);
        expect(sorted.size).to.equal(dataProcessor.data.size);
    });

    it('Sort by score ascending with 0', () => {
        const sorted = dataProcessor.filterByWordsInTitleSortByScore(0);
        expect(sorted.size).to.equal(dataProcessor.data.size);
    });
});

