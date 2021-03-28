import { initWasmModule } from './webassem'

/**
 * Runs the actual code in webassembly
 * @param code 
 * code to be run
 * @returns 
 * the result of running the code as a promise string
 */
export const runner = (code: string): Promise<string> => {
    let output: string

    // configuration for wasm
    let config = {
        print: (function () {
            return function (text) {
                if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
                // console.log(text);

                if (text != "emsc") {
                    output += `${text}\n`
                }
            };
        })(),
    }
    
    // returns the promise
    return initWasmModule(config).then(Module => {
        Module.ccall("run_lua", 'number', ['string'], [code])
    }).then(()=> {
        return output
    }).catch(()=> {
        return "Error"
    })
}