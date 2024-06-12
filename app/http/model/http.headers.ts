export type HttpHeader = { [key: string]: string | number }

export enum HttpHeaders {
    Accept_Encodding = 'accept-encoding',
    Content_Encodding = 'content-encoding',
    Content_Type = 'content-type',
    Content_Length = 'content-length',
    User_Agent = 'user-agent',
}