"use strict";
// import { exec } from 'child_process';
// import fs from 'fs/promises';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCode = runCode;
// export async function runCode(code: string): Promise<string> {
//   const id = uuidv4();
//   const folderPath = path.join(__dirname, 'temp', id);
//   const codePath = path.join(folderPath, 'main.cpp');
//   console.log("aaaab")
//   await fs.mkdir(folderPath, { recursive: true });
//   // await fs.writeFile(codePath, code);
//   await fs.writeFile(codePath, code);
//   const writtenCode = await fs.readFile(codePath, 'utf-8');
//   console.log("Written Code:\n", writtenCode); // Debug
//   console.log("nnnnh")
//   const dockerCommand = `
//     docker run --rm -v ${folderPath}:/app -w /app gcc:latest \
//     sh -c "g++ main.cpp -o main.out && ./main.out"
//   `;
//   console.log("hhhi")
//   return new Promise((resolve, reject) => {
//     exec(dockerCommand, (error, stdout, stderr) => {
//       if (error) return reject(stderr);
//       resolve(stdout);
//     });
//   });
// }
const child_process_1 = require("child_process");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const uuid_1 = require("uuid");
async function runCode(code) {
    const id = (0, uuid_1.v4)();
    const folderPath = path_1.default.join(__dirname, 'temp', id);
    const codePath = path_1.default.join(folderPath, 'main.cpp');
    await promises_1.default.mkdir(folderPath, { recursive: true });
    await promises_1.default.writeFile(codePath, code);
    const isWindows = os_1.default.platform() === 'win32';
    const dockerVolumePath = isWindows
        ? folderPath.replace(/\\/g, '/') // Convert backslashes to forward slashes
        : folderPath;
    const dockerCommand = isWindows
        ? `docker run --rm -v "${dockerVolumePath}:/app" -w /app gcc:latest bash -c "g++ main.cpp -o main.out && ./main.out"`
        : `docker run --rm -v ${dockerVolumePath}:/app -w /app gcc:latest sh -c "g++ main.cpp -o main.out && ./main.out"`;
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(dockerCommand, (error, stdout, stderr) => {
            if (error) {
                console.error("Docker execution error:", stderr || error.message);
                return reject(stderr || error.message);
            }
            resolve(stdout);
        });
    });
}
