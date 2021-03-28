import { initWasmModule } from './webassem'

/**
 * Run the lua code
 * @param code the code to be run in Lua
 * @param timeout an optional parameter that states the timeout of the code
 */
export function run_lua(code: string, timeout = 5): void {
    let config
    initWasmModule(config)
    return
}
