import run_lua from "lua-runner"

let testLuaCode = `    
function hello_lua()
    print("Hello World!")
    return "A"
end
return hello_lua()
`

// let textInput = document.getElementById("text")
run_lua(testLuaCode).then(res=> {console.log(res)})
