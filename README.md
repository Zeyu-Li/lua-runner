# Lua Runner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/lua-runner.svg)](https://badge.fury.io/js/lua-runner) ![download count badge](https://img.shields.io/npm/dt/lua-runner.svg) 

A node module that runs Lua code with the power of webassembly! 



## About

Run your Lua code right inside of JavaScript or TypeScript with this module. Made from [wasm_lua](https://github.com/Dreagonmon/wasm_lua)

- [x] Lua 5.4.0
- [x] TypeScript support
- [x] 0 dependencies
- [x] Tests
- [ ] Browser support



## Installation

To install do

`npm i lua-runner --save`

<!-- Build (to include wasm) `` -->



## Usage

To use the module

```js
// import the package
import {run_lua} from "lua-runner"

// define the lua code
let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`

// run the code with the run_lua function and use then to catch the response
run_lua(testLuaCode).then(res=> {
    console.log(res)
})
```

or without ES6 syntax as

```js
let { run_lua } = require("lua-runner");

let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`;

run_lua(testLuaCode).then(function (res) {
    console.log(res);
});
```



lua runner also has a function that returns a response object in the form of the following

```tsx
interface response {
    return?: string
    exit_code?: string
}
```

 This function call is `run_lua_res` instead of run_lua

```js
let { run_lua_res } = require("lua-runner");

let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`;

run_lua_res(testLuaCode).then(function (res) {
    console.log(res);
});
```



## Author

* [Zeyu Li](https://github.com/Zeyu-Li)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://www.lua.org/license.html) 

License under MIT, check out Lua at [lua.org](https://www.lua.org/) 
