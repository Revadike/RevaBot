const EventEmitter = require("events");
for (let i of ["log"]) {
    const fn = global.console[i];
    global.console[i] = (...args) => {
        global.console.output.emit(i, ...args);
        fn(...args);
    };
}
global.console.output = new EventEmitter();
// global.console.output.on("log", () => {
//     process.stdout.write("TEST");
// });

const Server = require("./components/Server"); // TODO: Convert to RevaPlugin

let server = new Server();
server.start();
