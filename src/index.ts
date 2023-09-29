import { DataCollector } from "./DataCollector";
import { DataProcessor } from "./DataProcessor";

const URL = 'https://news.ycombinator.com/';


(async () => {
    try {
        
        const datacollector = new DataCollector(URL);
        const data = await datacollector.getData();
        const dataProcessor = new DataProcessor(data);
    
        const a = dataProcessor.filterByWordsInTitleSortByComments(20);
        const b = dataProcessor.filterByWordsInTitleSortByScore(40,false);
    
        console.log('-----------------------');
        console.log(a);
        console.log('-----------------------');
        console.log(b);
    } catch (error) {
        console.error(error);
    }
})();

