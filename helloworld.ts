import { createServer, IncomingMessage, ServerResponse } from 'http';

//try to use commander package in order to create a cli command to return only the body of the request.
import {program} from "commander";

program.option("-o, --only-body", "display only the body of the request").option("-d, --only-data", "display data");

program.parse(process.argv);
const options = program.opts();
//should print the objects in the options array
console.log(options)
// if(options.onlyBody){
//     console.log("this is the body")
// }
const hostname = '0.0.0.0';
const port = 3000;


const echoMode = process.env.HTTP_ECHO_MODE;


const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    
    if (echoMode === "ONLY BODY"){
        response.write(`Body: `)
    }
    else{
        response.write(`Method: ${request.method}\n`);
        response.write(`Headers: ${JSON.stringify(request.headers)}\n`);
        response.write(`Path: ${request.url}\n`);
        response.write(`Host: ${request.headers.host}\n`)
        response.write(`Status Code: ${response.statusCode}\n`)
        response.write(`Body: `);
   
       
        
    }
    request.on(
        "data", chunk => {
            response.write(chunk)
        } 
    );

    request.on("end", () => {
        response.end("\n")
    });
    
})


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

/*
    accept cli arguments
    --only-body

*/