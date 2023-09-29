import { expect } from 'chai';
import { DataCollector } from '../DataCollector';
import { dataFromPage } from './dummyData';

describe('DataCollector', () => {
    
    const URL = 'https://news.ycombinator.com/';
    
    it('Constructor', ()=>{
        const dataCollector = new DataCollector(URL);
        expect(dataCollector).to.be.instanceOf(DataCollector);
    });

    // It is going to change thougt time 
    // it('Extract data',async ()=>{
    //     const dataCollector = new DataCollector(URL);
    //     const extractedData = await dataCollector.getData();

    //     expect(extractedData).to.equal(dataFromPage);
    // });

    it('Performance', ()=>{
        const dataCollector = new DataCollector(URL);
        const startTime = Date.now();
        dataCollector.getData();
        const endTime = Date.now();
        const execTime = endTime - startTime;
        const expectedTime = 100;//ms
        expect(execTime).to.be.below(expectedTime);
    });

});