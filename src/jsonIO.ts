import { writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";

export function writeJsonFile<T>(filePath:string, data: T, pretty = true): void{
    try{
        const jsonString = pretty
            ? JSON.stringify(data, null, 2)
            : JSON.stringify(data);
        writeFileSync(filePath, jsonString, 'utf-8');
        
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

export function appendJsonFile<T>(filePath: string, newData: T): void {
    const data = readFileSync(filePath, 'utf-8');
    const rawData = JSON.parse(data);

    const combinedData = Array.isArray(newData)
    ? [...rawData, ...newData]
    : [...rawData, newData]

    writeJsonFile(filePath,combinedData);
}