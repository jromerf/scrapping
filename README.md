# Data Processing and Collection

This project consists of two classes: `DataCollector` and `DataProcessor`, designed to collect and process data from `https://news.ycombinator.com/` website. `DataCollector` is responsible for extracting data from a web page using Puppeteer, while `DataProcessor` formats and filters this data according to specific criteria.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)

## Installation

To use this project, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/jromerf/scrapping.git

## Usage
# DataCollector

The DataCollector class is used to collect data. Here's an example of how to use it:

```js
import { DataCollector } from "./DataCollector";

const url = "https://www.example.com";
const collector = new DataCollector(url);

(async () => {
  const data = await collector.getData();
  console.log(data);
})();

```

# DataProcessor

The DataProcessor class is responsible for formatting and filtering collected data. Here's an example:

```js
import { DataProcessor } from "./DataProcessor";
import { DataCollected } from "./types";

const dataFromPage: DataCollected = /* your data here */;
const processor = new DataProcessor(dataFromPage);

// Filter by the number of words in the title and sort descending by comments
const filteredData = processor.filterByWordsInTitleSortByComments(10);

console.log(filteredData);

```

# Examples 

You could find examples in the test folder. 