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
