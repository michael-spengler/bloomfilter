// import { BloomFilter, EBloomBool } from "https://deno.land/x/bloom-filter/mod.ts"
import { BloomFilter } from "./mod.ts"

const bloomFilter = new BloomFilter(128)

const testArray = ["dog", "chicken", "cat"]

for (const entry of testArray) {
    bloomFilter.add(entry)
}

let actualTestResult = bloomFilter.test("horse")
console.log(actualTestResult)

actualTestResult = bloomFilter.test("cat")
console.log(actualTestResult)
