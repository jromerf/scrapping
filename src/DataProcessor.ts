import { Entry } from "./Entry";
import { DataCollected } from "./types";

export class DataProcessor{

    private formatedData = new Map<number, Entry>();

    constructor(readonly dataScrapped:DataCollected){
        this.formatData();
    }

    private getMetaDataById(id:number){
        const metaObj = this.dataScrapped.metaData.find((obj) => obj.id === id );
        if(metaObj) return metaObj.values;
        return null;
    }

    private formatData() {

        try {
            this.dataScrapped.titleData.forEach((obj) => {
                const {id,values} = obj;
                const metaValues = this.getMetaDataById(id);
    
                if(metaValues){
                    const newValues:Entry = {
                        id,
                        ...values,
                        ...metaValues,
                        titleSize: values.title.length
                    }
                    this.formatedData.set(id,newValues);
                }
    
            });
            
        } catch (error) {
            throw new Error(`Error applying format to data: ${error}`);
        }
    }

    filterByWordsInTitleSortByComments(wordsNum: number,greater: boolean = true) {

        const filtered = new Map();
        this.formatedData.forEach((value, key) => {
            if (value.titleSize > wordsNum) {
                filtered.set(key, value)
            }
        });
    
        const res = new Map([...filtered.entries()].sort((a, b) => greater ? b[1].comment - a[1].comment: a[1].comment - b[1].comment));
        return res;
    }
    
    filterByWordsInTitleSortByScore(wordsNum: number,greater: boolean = true) {
    
        const filtered = new Map();
        this.formatedData.forEach((value, key) => {
            if (value.titleSize <= wordsNum) {
                filtered.set(key, value)
            }
        });
    
        const res = new Map([...filtered.entries()].sort((a, b) => greater ? b[1].score - a[1].score: a[1].score - b[1].score));
        return res;
    }
}