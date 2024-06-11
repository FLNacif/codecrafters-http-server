export enum HttpMethod {
    GET,
    POST
}

export namespace HttpMethod {
    export function getVerb(verb: string): HttpMethod {
        switch(verb) {
            case 'GET':
            case 'get':
                return HttpMethod.GET
            case 'POST':
            case 'post':
                    return HttpMethod.POST
            default:
                throw new Error('Http method not identified')
        }
    }
}