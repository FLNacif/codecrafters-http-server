import { HttpCompression } from "./http-compression";

export class GzipCompression extends HttpCompression {
    public static algorithm = 'gzip'

    public compress(body: string): string {
        throw new Error("Method not implemented.");
    }
}