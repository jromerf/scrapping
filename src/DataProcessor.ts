import { Entry } from "./Entry";
import { DataCollected } from "./types";

export class DataProcessor{

    private formatedData = new Map<number, Entry>();

    constructor(readonly dataScrapped:DataCollected){
        this.formatData();
    }

    private formatData() {
        const titleAux = new Map();
        const metaAux = new Map();

        //TODO cambiar los any
        this.dataScrapped.titleData.forEach((obj: any) => {
            const { id, values } = obj;
            titleAux.set(id, values);
        });

        this.dataScrapped.metaData.forEach((obj: any) => {
            const { id, values } = obj;
            metaAux.set(id, values);
        });

        titleAux.forEach((values, id) => {
            if (metaAux.has(id)) {
                const bValues = metaAux.get(id);
                const newValues: Entry = {
                    id,
                    ...values,
                    ...bValues,
                    titleSize: values.title.length
                }
                this.formatedData.set(id, newValues);
            }
        });
    }

    filterByWordsInTitleSortByComments(wordsNum: number,greater: boolean = true) {

        const filtered = new Map();
        this.formatedData.forEach((value, key) => {
            if (value.titleSize > wordsNum) {
                filtered.set(key, value)
            }
        });
    
        const res = new Map([...filtered.entries()].sort((a, b) => greater ? a[1].comment - b[1].comment : b[1].comment - a[1].comment));
        console.log(res);
        return res;
    }
    
    filterByWordsInTitleSortByScore(wordsNum: number,greater: boolean = true) {
    
        const filtered = new Map();
        this.formatedData.forEach((value, key) => {
            if (value.titleSize <= wordsNum) {
                filtered.set(key, value)
            }
        });
    
        const res = new Map([...filtered.entries()].sort((a, b) => greater ? a[1].score - b[1].score : b[1].score - a[1].score));
        console.log(res);
        return res;
    }
}