import {run_lua} from "lua-runner";

let textInput = document.getElementById("text")
textInput.innerText(run_lua(`    
function hello_lua()
    print("Hello World!")
    return "A"
end

return hello_lua()
`).then(res=> {return res}))
