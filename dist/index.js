#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsonIO = __importStar(require("./jsonIO"));
const todoListPath = "src/todolist.json";
class TaskTracker {
    constructor() {
        this.commands = {};
        this.firstArg = process.argv.slice(2);
        this.secondArg = process.argv.slice(3);
        this.thirdArg = process.argv.slice(4);
        this.commands = {};
        this.setCommands();
        this.Execute();
    }
    setCommands() {
        this.commands = {
            add: this.addTask,
            remove: this.removeTask,
            list: this.listTask,
            update: this.updateTask,
            mark: this.markTask,
            help: this.helpTask,
        };
    }
    addTask(taskDiscription) {
        jsonIO.appendJsonFile(todoListPath, taskDiscription);
        process.exit(0);
    }
    removeTask(id) {
        jsonIO.removeJsonObject(todoListPath, id);
        process.exit(0);
    }
    listTask(taskStatus) {
        jsonIO.listJsonFile(todoListPath, taskStatus);
        process.exit(0);
    }
    updateTask(id, taskDiscription) {
        jsonIO.updateJsonObject(todoListPath, id, taskDiscription);
        process.exit(0);
    }
    markTask(id, taskStatus) {
        jsonIO.markJsonObject(todoListPath, id, taskStatus);
        process.exit(0);
    }
    helpTask() {
        console.log(`
Usage: task-traker [command]

Commands:
    help
    list   [to-do, in-progress, done]
    add    [userDiscription]
    remove [id]
    update [id] [userDiscription]
    mark   [id] [userStatus]
        `);
        process.exit(0);
    }
    Execute() {
        if (this.firstArg.length === 0 || this.firstArg[0] === "help") {
            this.helpTask();
        }
        const command = this.firstArg[0];
        const secondArg = this.secondArg[0];
        const thirdArg = this.thirdArg[0];
        if (command in this.commands) {
            this.commands[command](secondArg, thirdArg);
        }
        else {
            console.log("Wrong command, try: task-traker help");
            process.exit(1);
        }
    }
}
new TaskTracker();
