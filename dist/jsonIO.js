#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendJsonFile = appendJsonFile;
exports.removeJsonObject = removeJsonObject;
exports.listJsonFile = listJsonFile;
exports.updateJsonObject = updateJsonObject;
exports.markJsonObject = markJsonObject;
const node_fs_1 = require("node:fs");
const node_fs_2 = require("node:fs");
function writeJsonFile(filePath, data, pretty = true) {
    try {
        const jsonString = pretty //Adjusting json formating
            ? JSON.stringify(data, null, 2)
            : JSON.stringify(data);
        (0, node_fs_1.writeFileSync)(filePath, jsonString, 'utf-8');
    }
    catch (error) {
        throw new Error(`ERROR WRITING: ${error}`);
    }
}
function readJsonFile(filePath) {
    try {
        const data = (0, node_fs_2.readFileSync)(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        throw new Error(`ERROR READING: ${error}`);
    }
}
function fillInterface(data, userDiscription) {
    const maxIndex = data[data.length - 1].id + 1;
    const actualTime = getActualTime();
    const newData = [
        { id: maxIndex, discription: userDiscription, status: "To do", createTime: actualTime, updateTime: actualTime }
    ];
    return newData;
}
function getActualTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}
function appendJsonFile(filePath, userDiscription) {
    try {
        if (!(0, node_fs_1.existsSync)(filePath)) {
            (0, node_fs_1.writeFileSync)(filePath, "[]", 'utf-8');
        }
        const rawData = readJsonFile(filePath);
        const helperArray = [{ id: 0, discription: "NULL", status: "NULL", createTime: null, updateTime: null }]; //It helps to avoid errors when there is no data in todolist.json
        const helperRawData = [...helperArray, ...rawData];
        const newData = fillInterface(helperRawData, userDiscription);
        const combinedData = [...helperRawData, ...newData];
        combinedData.splice(0, 1); //deleting helperArray
        writeJsonFile(filePath, combinedData);
        console.log(`Task added successfully (Id:${newData[0].id})`);
    }
    catch (error) {
        throw new Error(`ERROR READING: ${error}`);
    }
}
function removeJsonObject(filePath, index) {
    const data = readJsonFile(filePath);
    data.splice(index - 1, 1);
    writeJsonFile(filePath, data);
    console.log(`Task removed successfully (Id:${index})`);
}
function listJsonFile(filePath, taskStatus) {
    const data = readJsonFile(filePath);
    if (taskStatus !== undefined) {
        switch (taskStatus) {
            case "to-do": {
                taskStatus = "To do";
                break;
            }
            case "in-progress": {
                taskStatus = "In progress";
                break;
            }
            case "done": {
                taskStatus = "Done";
                break;
            }
            default: {
                console.log("Wrong status command. Try [to-do, in-progress, done]");
                process.exit(1);
            }
        }
        const dataFiltered = data.filter(item => item.status == taskStatus);
        console.log(dataFiltered);
    }
    else {
        console.log(data);
    }
}
function updateJsonObject(filePath, index, userDiscription) {
    const data = readJsonFile(filePath);
    if (index - 1 < data.length && index - 1 >= 0) { //Out of range index check
        data[index - 1].discription = userDiscription;
        const actualTime = getActualTime();
        data[index - 1].updateTime = actualTime;
        writeJsonFile(filePath, data);
        console.log(`Task updated successfully (Id:${index})`);
    }
    else {
        console.log("Out of array range.");
        process.exit(1);
    }
}
function markJsonObject(filePath, index, userMark) {
    switch (userMark) {
        case "to-do": {
            userMark = "To do";
            break;
        }
        case "in-progress": {
            userMark = "In progress";
            break;
        }
        case "done": {
            userMark = "Done";
            break;
        }
        default: {
            console.log("Wrong mark command. Try [to-do, in-progress, done]");
            process.exit(1);
        }
    }
    const data = readJsonFile(filePath);
    if (index - 1 < data.length && index - 1 >= 0) { //Out of range index check
        data[index - 1].status = userMark;
        const actualTime = getActualTime();
        data[index - 1].updateTime = actualTime;
        writeJsonFile(filePath, data);
        console.log(`Task marked successfully (Id:${index})`);
    }
    else {
        console.log("Out of array range.");
        process.exit(1);
    }
}
