export type ResultType = 'app' | 'number' | 'webSearch';
export const unacceptableTypes: ResultType[] = ['number'];

export class Result<T = any> {
    // identifier of the plugin
    plugin: string;
    type: ResultType;
    value: T;

    constructor(plugin: string, type: ResultType, value: any) {
        this.plugin = plugin;
        this.type = type;
        this.value = value;
    }

    acceptable(): boolean {
        if (unacceptableTypes.includes(this.type))
            return false;

        return true;
    }
}