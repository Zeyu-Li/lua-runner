let run_lua = require("lua-runner");

let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`

run_lua["default"](testLuaCode).then(function (res) {
    console.log(res);
});