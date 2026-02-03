import { Plugin } from "../types/Plugin";
import { Result } from "../types/Result";
import { evaluate, compile } from 'mathjs';

export class ExpressionPlugin extends Plugin {
    id: string = "expression";
    prefix: string = "m";
    priority: number = 0;

    /*
    * that length check is there because i don't know
    * how to disable math.js spitting back a bunch
    * of random shit when i type just 'sin' for example
    * 
    * also i dont need this evaluator to return only letters
    * because i'll prolly only work with numbers. thats why the
    * regex checks if there are any numbers
    */
    private exprcheck = /^(?=.*\d).{1,30}$/;

    getResults(input: string): Result<number>[] {
        try {
            const res = evaluate(input);

            return res != null && this.exprcheck.test(res) ? [ this.makeResult('number', res) ] : [];
        } catch {
            return [];
        }
    }

    async preSearch(): Promise<void> {}

    // do nothing on submit
    // there's no need to do anything with the number, silly
    submit(result: Result): void {}
}