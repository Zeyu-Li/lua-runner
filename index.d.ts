import { run_lua, run_lua_res } from "./index"

// response object
interface response {
    return?: string
    exit_code?: string
}
declare function run_lua(code:string, timeout: number): Promise<string>
declare function run_lua(code: Array<string>, timeout: number): Promise<string>

declare function run_lua_res(code: Array<string>, timeout: number): Promise<response>
declare function run_lua_res(code: string, timeout: number): Promise<response>

export { run_lua, run_lua_res }
