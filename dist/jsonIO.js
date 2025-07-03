"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJsonFile = writeJsonFile;
exports.appendJsonFile = appendJsonFile;
const node_fs_1 = require("node:fs");
const node_fs_2 = require("node:fs");
function writeJsonFile(filePath, data, pretty = true) {
    try {
        const jsonString = pretty
            ? JSON.stringify(data, null, 2)
            : JSON.stringify(data);
        (0, node_fs_1.writeFileSync)(filePath, jsonString, 'utf-8');
    }
    catch (error) {
        throw new Error(`ERROR WRITING: ${error}`);
    }
}
// export function readJsonFile<T>(filePath: string): T {
//     try{
//         const data = readFileSync(filePath, 'utf-8');
//         return JSON.parse(data) as T;
//     }
//     catch (error){
//         throw new Error(`ERROR READING: ${error}`);
//     }
// }
function appendJsonFile(filePath, newData) {
    const data = (0, node_fs_2.readFileSync)(filePath, 'utf-8');
    const rawData = JSON.parse(data);
    const combinedData = Array.isArray(newData)
        ? [...rawData, ...newData]
        : [...rawData, newData];
    writeJsonFile(filePath, combinedData);
}
