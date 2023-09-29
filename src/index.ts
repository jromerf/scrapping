import puppeteer from "puppeteer";
import { DataCollector } from "./DataCollector";
import { DataProcessor } from "./DataProcessor";

const URL = 'https://news.ycombinator.com/';


(async () => {
    const datacollector = new DataCollector(URL);
    const data = await datacollector.getData();
    const dataProcessor = new DataProcessor(data);

    const a = dataProcessor.filterByWordsInTitleSortByComments(20);
    const b = dataProcessor.filterByWordsInTitleSortByScore(40,false);

    console.log('-----------------------');
    console.log(a);
    console.log('-----------------------');
    console.log(b);
})();



// async function getData() {
//     const browser = await puppeteer.launch({ headless: false });
//     try {

//         const page = await browser.newPage();
//         await page.goto(URL);

//         const data = await page.evaluate(() => {
//             let dataMap = new Map();
//             const table = document.querySelectorAll('.athing'); // TABLE
//             const subtext = document.querySelectorAll('.subtext');


//             table.forEach((item) => {
//                 const id = Number(item.id);
//                 const title = item.querySelector('.title a')?.textContent;
//                 let rank = item.querySelector('.rank')?.textContent;
//                 if (rank) rank = rank.slice(0, rank.length - 1);
//                 dataMap.set(id, { title, rank: Number(rank) });
//             });


//             let mapita = new Map();

//             subtext.forEach((item) => {
//                 const score = item.querySelector('.score')?.textContent;
//                 const numScore = Number(score?.match(/[0-9]/g)?.join('') || '0');

//                 const links = item.querySelectorAll('a');

//                 links.forEach((link) => {
//                     const href = link.getAttribute('href')?.match(/[0-9]/g)?.join('');
//                     if (link.textContent && link.textContent.includes('comments')) {
//                         const comment = Number(link.textContent.match(/[0-9]/g)?.join(''));
//                         // comm.push(comment +' '+  href);
//                         mapita.set(Number(href), { comment, score: numScore });
//                     }
//                 });

//             });

//             const title = Array.from(dataMap, ([id, values]) => ({ id, values }));
//             const meta = Array.from(mapita, ([id, values]) => ({ id, values }));

//             return { title, meta };
//         });

//         return data;

//         console.log(data.title);
//         console.log('-------------------------');
//         console.log(data.meta);

//     } catch (error) {
//         console.error(error);
//         if (browser) await browser.close();

//     }

// }

// type Entry = {
//     id: number,
//     title: string,
//     rank: number,
//     comments: number,
//     score: number,
//     titleSize: number
// }

// function formatData(data: any) {

//     const a = data.title;
//     const b = data.meta;
//     const aMap = new Map();
//     const bMap = new Map();


//     a.forEach((obj: any) => {
//         const { id, values } = obj;
//         aMap.set(id, values);
//     });

//     b.forEach((obj: any) => {
//         const { id, values } = obj;
//         bMap.set(id, values);
//     });


//     //combinar 
//     const resMap = new Map<number, Entry>();
//     aMap.forEach((values, id) => {
//         if (bMap.has(id)) {
//             const bValues = bMap.get(id);
//             const newValues: Entry = {
//                 id,
//                 ...values,
//                 ...bValues,
//                 titleSize: values.title.length
//             }
//             resMap.set(id, newValues);
//         }
//     })


//     console.log(resMap);
//     return resMap;
// }


// function filterByWordsInTitle(wordsNum: number, map: Map<number, Entry>, greater: boolean = true) {

//     const filtered = new Map();
//     map.forEach((value, key) => {
//         if (value.titleSize > wordsNum) {
//             filtered.set(key, value)
//         }
//     });

//     const res = new Map([...filtered.entries()].sort((a, b) => greater ? a[1].comment - b[1].comment : b[1].comment - a[1].comment));
//     console.log(res);
// }

// function filterByLessWordsInTitle(wordsNum: number, map: Map<number, Entry>, greater: boolean = true) {

//     const filtered = new Map();
//     map.forEach((value, key) => {
//         if (value.titleSize <= wordsNum) {
//             filtered.set(key, value)
//         }
//     });

//     const res = new Map([...filtered.entries()].sort((a, b) => greater ? a[1].score - b[1].score : b[1].score - a[1].score));
//     console.log(res);
// }


// (async () => {
//     const data = await getData();

//     console.log(data?.title);
//     console.log('-------------------------');
//     console.log(data?.meta);

//     const dData = formatData(data);

//     filterByWordsInTitle(5, dData, false);
//     filterByLessWordsInTitle(40, dData);


// })()



// const ids: string[] = [];
// table.forEach((item) => {
//     const id = item.id;
//     ids.push(id);
// });

// const data: string[] = [];
// return { title: Array.from(dataMap.entries()), meta: Array.from(mapita.entries()) };
// // return { data, scoreArr , comm,meta: Array.from(mapita.entries())};