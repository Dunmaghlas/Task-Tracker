import * as jsonIO from "./jsonIO";

const todoList = "todolist.json";

interface taskList {
    id:number,
    discription:string,
    status:string
}

class TaskTracker{
    firstArg:  string[];
    secondArg: string[];
    thirdArg:  string[];
    commands:   Record<string, Function> = {};

    constructor(){
        this.firstArg  =   process.argv.slice(2);
        this.secondArg =   process.argv.slice(3);
        this.thirdArg  =   process.argv.slice(4);
        this.commands   =   {};

        this.setCommands();
        this.Execute();
    }

    setCommands(){
        this.commands = {
            add:    this.addTask,
            remove: this.removeTask,
            help:   this.helpTask,
        }
    }
    
    helpTask(){
        console.log(`
Usage: task-traker [command]

Commands:
    help
    list
    add [userData]
    remove [id]
    update [id] [userData]
        `);
        process.exit(0);
    }

    addTask(taskDiscription: string){
        const data: taskList[] = [
            {id: 5, discription: "soska", status: "to do"}
        ]
        jsonIO.appendJsonFile(todoList, data);
        process.exit(0);
    }

    removeTask(id: number){

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