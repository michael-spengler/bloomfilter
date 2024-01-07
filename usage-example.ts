// https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=

import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"

const numberOfExpectedItemsInArray = 10000
const falsePositiveRate = 0.1 // 10 percent

const numberOfBitsInBitset = BloomFilter.getOptimalNumberOfBits(numberOfExpectedItemsInArray, falsePositiveRate)
// const numberOfHashFunctions = BloomFilter.getOptimalNumberOfHashFunctions(numberOfBitsInBitset, numberOfExpectedItemsInArray)

const bloomFilter = new BloomFilter(numberOfBitsInBitset)

const testArray = ["dog", "chicken", "cat"]

for (const entry of testArray) {
    bloomFilter.add(entry)
}

let actualTestResult = bloomFilter.test("horse")
console.log(actualTestResult)

actualTestResult = bloomFilter.test("cat")
console.log(actualTestResult)