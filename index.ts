import { runner } from './luaRunner'

class TimeoutError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "TimeoutError"
    }
}

/**
 * Run the lua code
 * @param code the code to be run in Lua
 * @param timeout an optional parameter that states the timeout of the code
 */
export default function run_lua(code: string, timeout = 5): Promise<string> {
    try {
        let val: Promise<string> = runner(code)
        // remove undefined from the output
        return val.then(e=>{return e.slice(9)})
    } catch (e) {
        // debug
        console.log(`Error: ${e}`)
    }

    // after timeout seconds, throw timeout error
    setTimeout(()=> {
        throw new TimeoutError(`Code exceeded ${timeout} seconds`)
    }, timeout * 1000)
}

// debug
// run_lua(`    
//     function hello_lua()
//       print("Hello World!")
//       return "A"
//     end
    
//     return hello_lua()
//     `).then(e=> {
//         console.log(e)
//     })

