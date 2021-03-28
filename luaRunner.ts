import { initWasmModule } from './webassem'

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
    
    return initWasmModule(config).then(Module => {
        Module.ccall("run_lua", 'number', ['string'], [code])
    }).then(()=> {
        return output
    }).catch(()=> {
        return "Error"
    })
}