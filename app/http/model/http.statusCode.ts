export enum HttpStatusCode {
    OK = 200,
    Created = 201,
    Not_Found = 404,
    Internal_Server_Error = 500
}

export namespace HttpStatusCode {
    export function getReasonPhrase(statusCode: HttpStatusCode): string {
        return HttpStatusCode[statusCode].replace('_',' ');
    }
}