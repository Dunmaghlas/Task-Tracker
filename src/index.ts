#!/usr/bin/env node

import * as jsonIO from "./jsonIO";

const todoListPath = "src/todolist.json";

interface taskList {
    id:number,
    discription:string,
    status:string,
    createTime: number,
    updateTime: number
}

class TaskTracker{
    firstArg:  string[];
    secondArg: string[];
    thirdArg:  string[];
    commands:  Record<string, Function> = {};

    constructor(){
        this.firstArg  =   process.argv.slice(2);
        this.secondArg =   process.argv.slice(3);
        this.thirdArg  =   process.argv.slice(4);
        this.commands  =   {};

        this.setCommands();
        this.Execute();
    }

    setCommands(){
        this.commands = {
            add:    this.addTask,
            remove: this.removeTask,
            list:   this.listTask,
            update: this.updateTask,
            mark:   this.markTask,
            help:   this.helpTask,
        }
    }


    addTask(taskDiscription: string){
        jsonIO.appendJsonFile(todoListPath, taskDiscription);
        process.exit(0);
    }

    removeTask(id: number){
        jsonIO.removeJsonObject(todoListPath, id);
        process.exit(0);
    }

    listTask(taskStatus: string){
        jsonIO.listJsonFile(todoListPath, taskStatus);
        process.exit(0);
    }

    updateTask(id: number, taskDiscription: string){
        jsonIO.updateJsonObject(todoListPath, id, taskDiscription);
        process.exit(0);
    }

    markTask(id:number, taskStatus: string){
        jsonIO.markJsonObject(todoListPath, id, taskStatus);
        process.exit(0);
    }

    helpTask(){
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

    Execute(){
        if (this.firstArg.length === 0 || this.firstArg[0] === "help") {
            this.helpTask();
        }

        const command   = this.firstArg[0];
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