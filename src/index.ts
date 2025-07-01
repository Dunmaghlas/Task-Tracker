class TaskTracker{
    first_arg:  string[];
    second_arg: string[];
    third_arg:  string[];
    commands:   Record<string, Function> = {};

    constructor(){
        this.first_arg  =   process.argv.slice(2);
        this.second_arg =   process.argv.slice(3);
        this.third_arg  =   process.argv.slice(4);
        this.commands   =   {};

        this.setCommands();
        this.Execute();
    }

    private setCommands(){
        this.commands = {
            add:    this.addTask,
            remove: this.removeTask,
            help:   this.helpTask,
        }
    }

    private addTask(){

    }

    private removeTask(){

    }
    
    private helpTask(){

    }

    private Execute(){
        if (this.first_arg.length === 0 || this.second_arg.length === 0 || this.first_arg[0] === "help") {
            console.log(`
                Usage: task-traker [command] [id] [data]
                
                Commands:
                    help
                    add
                    remove
                `);
        }
    }
}

new TaskTracker();