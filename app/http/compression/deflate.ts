import { HttpCompression } from "./http-compression";
import { deflateSync } from 'zlib'

export class DeflateCompression extends HttpCompression {
    public static algorithm = 'deflate'

    public compress(body: string): Buffer {
        return deflateSync(body)
    }
}