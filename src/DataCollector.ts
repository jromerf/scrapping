import puppeteer from "puppeteer";
import { DataCollected } from "./types";

export class DataCollector {

    private titleData = new Array();
    private metaData = new Array();

    constructor(readonly URL: string) { }

    private async scrapData() {
        const browser = await puppeteer.launch({ headless: false });
        try {
            const page = await browser.newPage();
            await page.goto(this.URL);

            const data = await page.evaluate(() => {
                let firstRowData = new Map();
                const table = document.querySelectorAll('.athing'); // TABLE
                const subtext = document.querySelectorAll('.subtext');


                table.forEach((item) => {
                    const id = Number(item.id);
                    const title = item.querySelector('.title a')?.textContent;
                    let rank = item.querySelector('.rank')?.textContent;
                    if (rank) rank = rank.slice(0, rank.length - 1);
                    firstRowData.set(id, { title, rank: Number(rank) });
                });


                let secondRowData = new Map();

                subtext.forEach((item) => {
                    const score = item.querySelector('.score')?.textContent;
                    const numScore = Number(score?.match(/[0-9]/g)?.join('') || '0');

                    const links = item.querySelectorAll('a');

                    links.forEach((link) => {
                        const href = link.getAttribute('href')?.match(/[0-9]/g)?.join('');
                        if (link.textContent && link.textContent.includes('comments')) {
                            const comment = Number(link.textContent.match(/[0-9]/g)?.join(''));
                            // comm.push(comment +' '+  href);
                            secondRowData.set(Number(href), { comment, score: numScore });
                        }
                    });

                });

                //To return values, imposible to return map
                const title = Array.from(firstRowData, ([id, values]) => ({ id, values }));
                const meta = Array.from(secondRowData, ([id, values]) => ({ id, values }));

                return { title, meta };
            });

            const res:DataCollected = { titleData: data.title, metaData: data.meta };
            return res;
        } catch (error) {
            throw new Error(`Failed to retrieve data: ${error}`);
        } finally {
            if (browser)
                await browser.close();
        }
    }

    async getData() {
        return await this.scrapData();
    }


}