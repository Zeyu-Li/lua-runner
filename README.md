# Lua Runner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

A node module that runner Lua code! 



## About

Run you Lua code right inside of JavaScript or TypeScript with this module

- [x] Lua 5.4.0
- [x] TypeScript support
- [ ] Browser support



## Installation

To install do

`npm i lua-runner --save`



## Usage

To use the module

```js
// import the package
import run_lua from "lua-runner";

// define the lua code
let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`

// run the code with the run_lua function and use then to catch the response
console.log(run_lua(testLuaCode).then(res=> {
    return res
}))
```



## Author

* [Zeyu Li](https://github.com/Zeyu-Li)



## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 