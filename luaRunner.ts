import { initWasmModule } from './webassem'

export function runner(code: string): string {
    let output: string

    // configuration for wasm
    let config = {
        print: (function () {
            return function (text) {
                if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
                console.log(text);

                if (text != "emsc") {
                    output += `${text}\n`
                }
            };
        })(),
    }
    
    initWasmModule(config).then(Module => {
        Module.ccall("run_lua", 'number', ['string'], [code])
    })
    return output
}