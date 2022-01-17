import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts"
import { BloomFilter, EBloomBool } from "./bloom-filter.ts"

Deno.test("should return EBloomBool.NO if entry is not yet added", async () => {

    const bloomFilter = BloomFilter.getInstanceBasedOnNumberOfBits(128)

    const testArray = ["dog", "chicken", "cat"]

    for (const entry of testArray) {
        bloomFilter.add(entry)
    }

    let actualTestResult = bloomFilter.test("horse")
    assertEquals(actualTestResult, EBloomBool.NO)

    actualTestResult = bloomFilter.test("bird")
    assertEquals(actualTestResult, EBloomBool.NO)

    actualTestResult = bloomFilter.test("rabbit")
    assertEquals(actualTestResult, EBloomBool.NO)

})

Deno.test("should return optimal number of Bitsets for given expected array size + falsePositiveValue", async () => {
    const falsePositiveProbability = 0.1
    const actualResult = BloomFilter.getOptimalNumberOfBitsAndHashFunctions(1000, falsePositiveProbability) // fp / fp + true negative 

    console.log(`if you want to achieve a falsePositiveProbability of ${falsePositiveProbability}, I recommend to use ${actualResult} bits.`)
    const expectedResult = 4793

    assertEquals(actualResult, expectedResult)
})

Deno.test("should return EBloomBool.PERHAPS if entry is potentially added", async () => {

    const bloomFilter = BloomFilter.getInstanceBasedOnNumberOfBits(128)

    const testArray = ["dog", "chicken", "cat"]

    for (const entry of testArray) {
        bloomFilter.add(entry)
    }

    let actualTestResult = bloomFilter.test("dog")
    assertEquals(actualTestResult, EBloomBool.PERHAPS)

    actualTestResult = bloomFilter.test("chicken")
    assertEquals(actualTestResult, EBloomBool.PERHAPS)

    actualTestResult = bloomFilter.test("cat")
    assertEquals(actualTestResult, EBloomBool.PERHAPS)

})
