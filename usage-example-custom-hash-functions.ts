// https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=
// import { BloomFilter } from "./mod.ts"
import { BloomFilter } from "https://deno.land/x/bloomfilter/mod.ts"

const numberOfExpectedItemsInArray = 10000
const falsePositiveRate = 0.1 // 10 percent

const numberOfBitsInBitset = BloomFilter.getOptimalNumberOfBits(numberOfExpectedItemsInArray, falsePositiveRate)

const bloomFilter = new BloomFilter(numberOfBitsInBitset, (x: number) => (x * 2) % 11, (x: number) => (x * 3) % 11, (x: number) => (x * 4) % 11)

const exampleArray = [2, 5, 6]

for (const entry of exampleArray) {
    bloomFilter.add(entry)
}


let actualTestResult = bloomFilter.test(3)
console.log(actualTestResult)

actualTestResult = bloomFilter.test(34)
console.log(actualTestResult)