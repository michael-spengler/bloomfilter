// https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=

import crc32 from 'https://deno.land/x/hash/mod-crc32.ts'
import BitSet from "https://cdn.esm.sh/v57/bitset@5.1.1/es2021/bitset.js"


export enum EBloomBool {
    NO = "NO",
    PERHAPS = "PERHAPS"
}

export class BloomFilter {

    public static getOptimalNumberOfBits(numberOfExpectedItems: number, falsePositiveRate: number): number {
        const optimalNumberOfBits = Math.ceil((numberOfExpectedItems * Math.log(falsePositiveRate)) / Math.log(1 / Math.pow(2, Math.log(2))))
        return Math.round(optimalNumberOfBits)
    }

    public static getOptimalNumberOfHashFunctions(numberOfBitsInBitset: number, numberOfExpectedItems: number) {
        return Math.round((numberOfBitsInBitset / numberOfExpectedItems) * Math.log(2))
    }

    private bitSet: any

    public constructor(private numberOfBitsUsed: number, private numberOfHashFunctions: number = 1) {
        this.bitSet = new BitSet()
        if (numberOfHashFunctions > 1) {
            console.log(`Warning: currently this module only works with one hash function for demo reasons`)
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
