"use strict";
// import {run_lua} from "lua-runner"
// exports.__esModule = true;
var {run_lua_res} = require("lua-runner");
var testLuaCode = "    \nfunction hello_lua()\n    print(\"Hello World!\")\n    return \"A\"\nend\nreturn hello_lua()\n";
// let textInput = document.getElementById("text")
run_lua_res(testLuaCode).then(function (res) { console.log(res); });
