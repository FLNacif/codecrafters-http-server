export enum HttpStatusCode {
    OK = 200,
    Not_Found = 404
}

export namespace HttpStatusCode {
    export function getReasonPhrase(statusCode: HttpStatusCode): string {
        return HttpStatusCode[statusCode].replace('_',' ');
    }
}