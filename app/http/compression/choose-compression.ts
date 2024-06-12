import { supportedCompressions } from ".";
import { HttpHeaders } from "../model/http.headers";
import { HttpRequest } from "../model/http.request";
import { HttpResponse } from "../model/http.response";

export class ChooseCompression {
    public static choose(request: HttpRequest, response: HttpResponse) {
        if (!request.headers[HttpHeaders.Accept_Encodding]) return

        const requestAcceptEncoding = request.headers[HttpHeaders.Accept_Encodding].split(',').map(x => x.trim().toLowerCase())
        for (const enconding of requestAcceptEncoding) {
            if (supportedCompressions.includes(enconding)) {
                response.setHeader(HttpHeaders.Content_Encodding, enconding)
                break
            }
        }
    }
}