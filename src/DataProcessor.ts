import { Entry } from "./Entry";
import { DataCollected } from "./types";

export class DataProcessor {

    private formatedData = new Map<number, Entry>();

    constructor(readonly dataScrapped: DataCollected) {
        this.formatData();
    }

    private getMetaDataById(id: number) {
        const metaObj = this.dataScrapped.metaData.find((obj) => obj.id === id);
        if (metaObj) return metaObj.values;
        return null;
    }

    private formatData() {

        try {
            this.dataScrapped.titleData.forEach((obj) => {
                const { id, values } = obj;
                const metaValues = this.getMetaDataById(id);

                if (metaValues) {
                    const newValues: Entry = {
                        id,
                        ...values,
                        ...metaValues,
                        titleSize: values.title.length
                    }
                    this.formatedData.set(id, newValues);
                }

            });

        } catch (error) {
            throw new Error(`Error applying format to data: ${error}`);
        }
    }

    filterByWordsInTitleSortByComments(wordsNum: number, greater: boolean = true) {

        let filtered = new Map();
        if (wordsNum < 0) throw new Error('Words number not accepted');
        
        if (wordsNum > 0) {
            this.formatedData.forEach((value, key) => {
                if (value.titleSize > wordsNum) {
                    filtered.set(key, value)
                }
            });
        }else{
            return new Map([...this.formatedData.entries()].sort((a, b) => greater ? b[1].comments - a[1].comments : a[1].comments - b[1].comments));
        }
        const res = new Map([...filtered.entries()].sort((a, b) => greater ? b[1].comments - a[1].comments : a[1].comments - b[1].comments));
        return res;
    }

    filterByWordsInTitleSortByScore(wordsNum: number, greater: boolean = true) {
        let filtered = new Map();

        if (wordsNum < 0) throw new Error('Words number not accepted');

        if(wordsNum >0){
            this.formatedData.forEach((value, key) => {
                if (value.titleSize <= wordsNum) {
                    filtered.set(key, value)
                }
            });
        }else{
            return new Map([...this.formatedData.entries()].sort((a, b) => greater ? b[1].score - a[1].score : a[1].score - b[1].score));
        }

        const res = new Map([...filtered.entries()].sort((a, b) => greater ? b[1].score - a[1].score : a[1].score - b[1].score));
        return res;
    }

    get data() { return this.formatedData; };
}