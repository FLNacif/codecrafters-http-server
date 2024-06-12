import { HttpMethod } from "./http.method"

export class HttpRequest {
    public readonly method: HttpMethod
    public readonly path: string
    public readonly httpVersion: string
    public readonly headers: { [key: string]: string } = {}
    public readonly body: any
    private incomingVariables: { [key: string]: string } = {}

    constructor(data: string){
        const lines = data.split('\r\n')

        const requestLine = this.parseRequestLineInfo(lines[0])
        this.method = requestLine.action
        this.path = requestLine.path
        this.httpVersion = requestLine.httpVersion

        this.headers = this.parseHeaders(lines)
        this.body = this.parseBody(lines)
    }

    private parseBody(lines: string[]) {
        return lines[lines.length - 1]
    }

    private parseHeaders(lines: string[]) {
        const headers: any = {}
        for(let i = 1; i < lines.length; i++) {
            if(lines[i] == '') break
            const headerDividerIndex = this.findFirstColon(lines[i])
            if(headerDividerIndex === -1) throw new Error(`Failed to parse header line ${lines[i]}`)
            const headerName = lines[i].slice(0, headerDividerIndex).toLowerCase()
            const headerValue = lines[i].slice(headerDividerIndex+1).trim()
            headers[headerName] = headerValue
        }
        return headers
    }
    
    private findFirstColon(line: string): number {
        for(let i = 0; i < line.length; i++) {
            if(line.charAt(i) == ':')
                return i
        }
        return -1
    }

    private parseRequestLineInfo(line: string){
        const requestLine = line.split(' ')
        const action = HttpMethod.getVerb(requestLine[0])
        const path = requestLine[1]
        const httpVersion = requestLine[2]
        
        return { action, path, httpVersion }
    }

    public setPathVariables(variables: {[key: string]: string}) {
        this.incomingVariables = variables
    }

    public getPathVariables(varName: string): string {
        return this.incomingVariables[varName]
    }
}