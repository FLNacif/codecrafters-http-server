import { supportedCompressions } from ".";
import { HttpHeaders } from "../model/http.headers";
import { HttpRequest } from "../model/http.request";
import { HttpResponse } from "../model/http.response";
import { DeflateCompression } from "./deflate";
import { GzipCompression } from "./gzip";

export class CompressionFactory {
    public static chooseCompression(request: HttpRequest, response: HttpResponse) {
        if (!request.headers[HttpHeaders.Accept_Encodding]) return

        const requestAcceptEncoding = request.headers[HttpHeaders.Accept_Encodding].split(',').map(x => x.trim().toLowerCase())
        for (const enconding of requestAcceptEncoding) {
            if (supportedCompressions.includes(enconding)) {
                response.setHeader(HttpHeaders.Content_Encodding, enconding)
                break
            }
        }
    }

    public static encoding(algorithm: string, body: string): Buffer {
        switch(algorithm) {
            case GzipCompression.algorithm:
                return new GzipCompression().compress(body)
            case DeflateCompression.algorithm:
                return new DeflateCompression().compress(body)
            default:
                return Buffer.from(body)
        }
    }
}