export enum StatusCode {
    OK = 200,
}

export namespace StatusCode {
    export function getReasonPhrase(statusCode: StatusCode): string {
        return StatusCode[statusCode];
    }
}