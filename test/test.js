"use strict";
exports.__esModule = true;
var lua_runner_1 = require("lua-runner");
// let textInput = document.getElementById("text")
lua_runner_1["default"]("    \nfunction hello_lua()\n    print(\"Hello World!\")\n    return \"A\"\nend\n\nreturn hello_lua()\n").then(function (res) { console.log(res); });
