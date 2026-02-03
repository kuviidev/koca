import { Plugin } from "../types/Plugin";
import { Result } from "../types/Result";

export class WebSearchPlugin extends Plugin {
    id: string = "websearch";
    prefix: string = "w";
    priority: number = 10;

    getResults(input: string): Result<string>[] {
        if (input.length != 0)
            return [ this.makeResult('webSearch', input) ];
        else return [];
    }

    async preSearch(): Promise<void> {}

    submit(result: Result): void {
        // open the browser and search

        const browser = `librewolf`;
        const url = `https://duckduckgo.com/?q=%q&ia=web`
        const encoded = encodeURI(result.value);

        const process = window.child_process.spawn(
            'librewolf',
            [ 
                url.replace('%q', encoded)
            ],
            {
                detached: true,
                stdio: 'ignore',
            }
        );
    }
}