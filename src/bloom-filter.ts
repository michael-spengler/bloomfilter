// https://hur.st/bloomfilter/?n=100000&p=0.6&m=&k=

import {crc32, BitSet} from '../deps.ts'


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
    private hashFunctions: any

    public constructor(private numberOfBitsUsed: number, ...hashFunctions: any) {
        this.bitSet = new BitSet()
        this.hashFunctions = hashFunctions
        console.log(`Warning: currently this module only works with one hash function for demo reasons`)
    }

    public add(entry: string | number): void {

        let position
        if (!this.hashFunctions.length) {
            const crc32hash = this.generateCRC32Hash(entry.toString())
            position = crc32hash % this.numberOfBitsUsed
            this.bitSet.set(position, 1)
        } else {
            for (const hashFunction of this.hashFunctions) {
                position = hashFunction(entry)
                if (position > this.numberOfBitsUsed - 1) {
                    throw new Error(`The calculated position ${position} exceeds the Bitset size ${this.numberOfBitsUsed}`)
                }
                this.bitSet.set(position, 1)
            }

        }
    }

    public test(entry: string | number): EBloomBool {

        let position

        if (!this.hashFunctions.length) {
            const hash = this.generateCRC32Hash(entry.toString())
            position = hash % this.numberOfBitsUsed
            if (this.bitSet.get(position) === 1) {
                return EBloomBool.PERHAPS
            }

        } else {
            for (const hashFunction of this.hashFunctions) {
                position = hashFunction(entry)
                if (this.bitSet.get(position) === 0) {
                    return EBloomBool.NO
                }
            }
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
