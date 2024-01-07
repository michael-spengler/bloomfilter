import { assertEquals } from "../deps.ts"
import { BloomFilter, EBloomBool } from "./bloom-filter.ts"

Deno.test("should handle function handovers", async () => {

    const bloomFilter = new BloomFilter(11, (x: number) => x * 2 % 11, (x: number) => x * 3 % 11, (x: number) => x * 4 % 11)

    const exampleArray = [6, 9, 14]

    for (const entry of exampleArray) {
        bloomFilter.add(entry)
    }

    assertEquals(bloomFilter.test(11), EBloomBool.NO)
    assertEquals(bloomFilter.test(6), EBloomBool.PERHAPS)
    assertEquals(bloomFilter.test(3), EBloomBool.PERHAPS)
})

Deno.test("should return EBloomBool.NO if entry is not yet added", async () => {

    const bloomFilter = new BloomFilter(128)

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

Deno.test("should return EBloomBool.PERHAPS if entry is potentially added", async () => {

    const bloomFilter = new BloomFilter(128)

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
