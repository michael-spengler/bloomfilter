import crc32 from 'https://deno.land/x/hash/mod-crc32.ts'
import BitSet from "https://cdn.esm.sh/v57/bitset@5.1.1/es2021/bitset.js"


export enum EBloomBool {
    NO = "NO",
    PERHAPS = "PERHAPS"
}

export class BloomFilter {

    public static getInstanceBasedOnNumberOfBits(numberOfBitsUsed: number, hashFunctionURLS: string[] = ["https://deno.land/x/hash/mod-crc32.ts"]): BloomFilter {
        const instance = new BloomFilter(numberOfBitsUsed, undefined, hashFunctionURLS)
        return instance
    }

    public static getInstanceBasedOnNumberOfExpectedItems(numberOfExpectedItems: number, hashFunctionURLS: string[] = ["https://deno.land/x/hash/mod-crc32.ts"]): BloomFilter {
        const instance = new BloomFilter(undefined, numberOfExpectedItems, hashFunctionURLS)
        return instance
    }

    public static getOptimalNumberOfBitsAndHashFunctions(numberOfExpectedItems: number, falsePositiveValue: number): number {
        const optimalNumberOfBitsAndHashFunctions = -1 * (numberOfExpectedItems * Math.log(falsePositiveValue)) / Math.pow((Math.log(2)), 2)
        return Math.round(optimalNumberOfBitsAndHashFunctions)
    }

    private bitSet: any

    private constructor(private numberOfBitsUsed: number | undefined, private numberOfExpectedItems: number | undefined, private hashFunctionURLS: string[]) {
        this.bitSet = new BitSet()

        if (this.numberOfBitsUsed === undefined) {
            // this.numberOfBitsUsed = tbd mit einer Formel?
        }
    }

    public add(entry: string): void {

        const crc32hash = this.generateCRC32Hash(entry)
        const position = crc32hash % (this.numberOfBitsUsed as number)

        this.bitSet.set(position, 1)

    }

    public test(entry: string): EBloomBool {

        const hash = this.generateCRC32Hash(entry)
        const position = hash % (this.numberOfBitsUsed as number)

        if (this.bitSet.get(position) === 1) {
            return EBloomBool.PERHAPS
        }

        return EBloomBool.NO

    }

    private generateCRC32Hash(entry: string): number {

        return crc32.str(entry) * -1

    }

    private generateSHA256Hash(entry: string): number {

        return crc32.str(entry) * -1

    }

}
