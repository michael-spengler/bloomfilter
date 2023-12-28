# Bloom Filter
Bloom Filters are efficient probabilistic data structures which you can use to check whether entries are potentially already [in an array or not](https://www.youtube.com/watch?v=gBygn3cVP80).

## Usage Examples
### Default Hash Function
```sh
deno run https://deno.land/x/bloomfilter/usage-example.ts
```

```ts
import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"

const numberOfExpectedItemsInArray = 10000
const falsePositiveRate = 0.1 // 10 percent
const numberOfBitsInBitset = BloomFilter.getOptimalNumberOfBits(numberOfExpectedItemsInArray, falsePositiveRate)
const numberOfHashFunctions = BloomFilter.getOptimalNumberOfHashFunctions(numberOfBitsInBitset, numberOfExpectedItemsInArray)

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

### Custom Hash Functions
```ts
import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"
const numberOfExpectedItemsInArray = 10000
const falsePositiveRate = 0.1 // 10 percent
const numberOfBitsInBitset = BloomFilter.getOptimalNumberOfBits(numberOfExpectedItemsInArray, falsePositiveRate)

const bloomFilter = 
    new BloomFilter(numberOfBitsInBitset, (x: number) => (x * 2) % 11, (x: number) => (x * 3) % 11, (x: number) => (x * 4) % 11)

const exampleArray = [2, 5, 6]
for (const entry of exampleArray) {
    bloomFilter.add(entry)
}
let actualTestResult = bloomFilter.test(3)
console.log(actualTestResult)

actualTestResult = bloomFilter.test(34)
console.log(actualTestResult)
```

## Execute Unit Tests
```sh
deno test https://deno.land/x/bloomfilter/src/bloom-filter.spec.ts
```

---
  
For further examples you can check the [unit tests](https://github.com/michael-spengler/bloomfilter/blob/main/src/bloom-filter.spec.ts).  

## Considering Optimization Options
See https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=

### Number of Hash Functions
Increasing the number of hash functions used for the Bloomfilter (Bitset) population increases the probability that a specific item from the array is in fact represented by a specific (set) of bit(s). 

The downside is that with more hash functions the likelyhood that e.g. (almost) all Bits are set to 1 resulting in unnecessarily frequent "Perhaps" responses...  increases.

## Donations
Thanks to [Freedom Cash](https://FreedomCash.org), we are already free.  
If you want to donate, you might consider donating to the [otherparty.co.uk](https://www.otherparty.co.uk/donate-crypto-the-other-party) to ensure people do not need to donate to victims but rather donate successfully to problem solvers.   
  
![direct-democracy](https://github.com/michael-spengler/sleep/assets/145258627/fe97b7da-62b4-4cf6-9be0-7b03b2f3095a)  