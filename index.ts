import { runner } from './luaRunner'

/**
 * A custom timeout error
 */
class TimeoutError extends Error {
    /**
     * The constructor 
     * @param message 
     * error message
     */
    constructor(message: string) {
        super(message)
        this.name = "TimeoutError"
    }
}

// response object
interface response {
    return?: string
    exit_code?: string
}

/***
 * Run the lua code and returns a string promise
 * Must use then/catch syntax
 * @param code 
 * the code to be run in Lua
 * @param timeout 
 * an optional parameter that states the timeout of the code
 * @returns 
 * the result of the code run as a string promise. 
 * The last line returned is the exit condition that may contain an error message
 * in the form of `Code exited with: ${error_message}`
 */
export function run_lua(code: string, timeout?: number): Promise<string>
export function run_lua(code: Array<string>, timeout?: number): Promise<string>
export function run_lua(code: any, timeout = 5): Promise<string> {
    let codeString = ''
    if (typeof code == "object") {
        // if array of objects try to concate the elements into one string
        try {
            code.forEach(element => {
                codeString+=element+'\n'
            });
        } catch (e) {
            throw new TypeError("The type provided can only be string or string array")
        }
    } else if (typeof code == "string") {
        codeString = code
    }
    try {
        let val: Promise<string> = runner(codeString)
        // remove undefined from the output and the last char of new line
        return val.then(e=>{return e.slice(9).slice(0, -1)})
    } catch (e) {
        // debug
        console.log(`Error: ${e}`)
    }

    // after timeout seconds, throw timeout error
    setTimeout(()=> {
        throw new TimeoutError(`Code exceeded ${timeout} seconds`)
    }, timeout * 1000)
}

/***
 * Run the lua code and returns a string promise
 * Must use then/catch syntax
 * @param code 
 * the code to be run in Lua
 * @param timeout 
 * an optional parameter that states the timeout of the code
 * @returns 
 * the result of the code is a response object with a return and an exit_code condition
 */
export function run_lua_res(code: string, timeout?: number): Promise<response>
export function run_lua_res(code: Array<string>, timeout?: number): Promise<response>
export function run_lua_res(code: any, timeout = 5): Promise<response> {
    return run_lua(code, timeout).then(res=>{
        return {
            return: res.lastIndexOf('\n') == -1 ? null : res.slice(0,res.lastIndexOf('\n')),
            exit_code: res.split(/\r?\n/).pop().slice(18)
        }
    })
}


// debug
// run_lua_res(`    
//     function hello_lua()
//       print("Hello World!")
//       return "A"
//     end
    
//     return hello_lua()
//     `).then(e=> {
//         console.log(e)
//     })

