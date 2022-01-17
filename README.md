# Bloom Filter

Bloom Filters are efficient probabilistic data structures which you can use to check whether entries are potentially already [in an array or not](https://www.youtube.com/watch?v=gBygn3cVP80).

## Usage Examples

```sh

deno run https://deno.land/x/bloomfilter/usage-example.ts

```


```ts

import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"

const bloomFilter = new BloomFilter(128)

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

### Number of Hash Functions
Increasing the number of hash functions used for the Bloomfilter (Bitset) population increases the probability that a specific item from the array is in fact represented by those bits. 

The downside is that with this the likelyhood that e.g. (almost) all Bits are set to 1 resulting in unnecessarily frequent "Perhaps" responses...  

### Formulas
tbd.
  
