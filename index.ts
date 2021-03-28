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
function run_lua(code: string, timeout = 5): string {
    try {
        let val: string = runner(code)
        return val
    } catch (e) {
        // debug
        console.log(e)
    }

    // after timeout seconds, throw timeout error
    setTimeout(()=> {
        throw new TimeoutError(`Code exceeded ${timeout} seconds`)
    }, timeout * 1000)
}

console.log(run_lua(`--[[
    This is a Lua online editor!
    Currently running Lua version 5.4.0
    Source code here: https://github.com/Zeyu-Li/Lua-Online
    ]]
    
    function hello_lua()
      print("Hello World!")
      return "Hit Ctrl-B to rebuild"
    end
    
    return hello_lua()
    `))