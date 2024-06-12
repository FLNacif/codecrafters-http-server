import { HttpCompression } from "./http-compression";
import { gzipSync } from 'zlib'

export class GzipCompression extends HttpCompression {
    public static algorithm = 'gzip'

    public compress(body: string): Buffer {
        return gzipSync(body)
    }
}