import { Result, ResultType } from "./Result";

export abstract class Plugin<T = any> {
    abstract id: string;
    abstract prefix: string;
    // might not be needed because of the way i register and loop over plugins
    abstract priority: number;
    protected preSearchResults: T[] = [];
    // true if we don't want to await preSearch (UNUSED)
    protected lazy = false;

    abstract getResults(input: string): Result<T>[];
    abstract preSearch(): Promise<void>;
    abstract submit(result: Result<T>): void;

    protected makeResult<T = any>(type: ResultType, value: T): Result<T> {
        return new Result(this.id, type, value);
    }
}
