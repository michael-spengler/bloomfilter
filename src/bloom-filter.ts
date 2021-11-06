import crc32 from 'https://deno.land/x/hash/mod-crc32.ts'
import BitSet from "https://cdn.esm.sh/v57/bitset@5.1.1/es2021/bitset.js"


export enum EBloomBool {
    NO = "NO",
    PERHAPS = "PERHAPS"
}

export class BloomFilter {

    private numberOfBitsUsed: number
    private bitSet: any

    constructor(numberOfBitsUsed: number) {
        this.numberOfBitsUsed = numberOfBitsUsed
        this.bitSet = new BitSet()
    }

    public add(entry: string): void {

        const hash = this.generateHash(entry)
        const position = hash % this.numberOfBitsUsed

        this.bitSet.set(position, 1)

    }

    public test(entry: string): EBloomBool {

        const hash = this.generateHash(entry)
        const position = hash % this.numberOfBitsUsed

        if (this.bitSet.get(position) === 1) {
            return EBloomBool.PERHAPS
        }

        return EBloomBool.NO

    }

    private generateHash(entry: string) {

        return crc32.str(entry) * -1

    }

}
