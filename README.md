# Bloom Filter

Bloom Filters are efficient probabilistic data structures which you can use to check whether entries are potentially already [in an array or not](https://www.youtube.com/watch?v=gBygn3cVP80).

## Usage Examples

```sh

deno run https://deno.land/x/bloomfilter/usage-example.ts

```


```ts

import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"

const numberOfExpectedItemsInArray = 10000
const falsePositiveRate = 0.1 // 10 percent

const numberOfBitsInBitset = BloomFilter.getOptimalNumberOfBits(numberOfExpectedItemsInArray, falsePositiveRate)
const numberOfHashFunctions = BloomFilter.getOptimalNumberOfHashFunctions(numberOfBitsInBitset, numberOfExpectedItemsInArray))

const bloomFilter = new BloomFilter(numberOfBitsInBitset, numberOfHashFunctions)

const testArray = ["dog", "chicken", "cat"]

for (const entry of testArray) {
    bloomFilter.add(entry)
}

let actualTestResult = bloomFilter.test("horse")
console.log(actualTestResult)

actualTestResult = bloomFilter.test("cat")
console.log(actualTestResult)

```

---
  
For further examples you can check the [unit tests](https://github.com/michael-spengler/bloomfilter/blob/main/src/bloom-filter.spec.ts).


## Considering Optimization Options
See https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=

### Number of Hash Functions
Increasing the number of hash functions used for the Bloomfilter (Bitset) population increases the probability that a specific item from the array is in fact represented by a specific (set) of bit(s). 

The downside is that with more hash functions the likelyhood that e.g. (almost) all Bits are set to 1 resulting in unnecessarily frequent "Perhaps" responses...  increases.

  
