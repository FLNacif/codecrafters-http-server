export enum HttpMethod {
    GET
}

export namespace HttpMethod {
    export function getVerb(verb: string): HttpMethod {
        switch(verb) {
            case 'GET':
            case 'get':
                return HttpMethod.GET
            default:
                throw new Error('Http method not identified')
        }
    }
}