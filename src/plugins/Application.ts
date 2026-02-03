/*
the reason we use ini-simple-parser instead of ini
is because this has better support for semicolons
in the desktop entry's list which are usually
interpreted as comments
*/
import parse from "ini-simple-parser";
import { Plugin } from "../types/Plugin";
import { Result } from "../types/Result";
import { promisify } from "util";

const readDir = window.util.promisify(window.filesystem.readDir);
const readFile = window.util.promisify(window.filesystem.readFile);

export class ApplicationPlugin extends Plugin {
    id: string = "application";
    prefix: string = "a";
    priority: number = 1;

    getResults(input: string): Result<any>[] {
        // TODO: implement better search, split input and search those also
        return this.preSearchResults
            .filter(x => x.name.toLowerCase().includes(input.toLowerCase()))
            .map(x => this.makeResult('app', x));
    }

    async preSearch(): Promise<void> {
        console.log('app presearch');
        const appDir = '/usr/share/applications/';
        const files = await readDir(appDir);

        
        for await (const file of files) {
            const content = await readFile(window.filesystem.joinPath(appDir, file))
            const parsed = parse(content, {
                inlineComments: false,
                inferBooleans: true,
            });

            try {
                const cucc = {
                    name: parsed['Desktop Entry']['Name'],
                    categories: (parsed['Desktop Entry']['Categories'] || '')
                        .split(';')
                        .filter(x => !!x), // filter out empty strings
                    comment: parsed['Desktop Entry']['Comment'] ?? '',
                    icon: parsed['Desktop Entry']['Icon'] ?? '',
                    terminal: parsed['Desktop Entry']['Terminal'] ?? false,
                    exec: parsed['Desktop Entry']['Exec'].split(' ')[0],
                };

                this.preSearchResults.push(cucc);
            } catch {
                console.error(`parsing error in ${file}`);
            }
        }
    }

    submit(result: Result<any>): void {
        // open the app
        const process = window.child_process.spawn(result.value.exec, {
            detached: true,
            stdio: 'ignore',
        });

        // process.unref();
    }
}