import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import TodoSchema from "./Schema/TodoSchema.js";
import Todos from "./Schema/TodoSchema.js";
import ora from 'ora'
import chalk from "chalk";
// import addTask from "./commands/addTask";



export async function connectDB() {
    try {
        const spinner = ora(`connecting to the base....`).start()
        await mongoose.connect(process.env.MONGO_URL)
        spinner.stop()
        console.log(chalk.greenBright(`successfully connected to database !!`));
    } catch (error) {
        console.log(chalk.redBright(`Error:`),error);
        process.exit(1) 
    }
}
async function input() {
    return new Promise((resolve) => {
         resolve('Simulated user input');
    });
}

//  for Perform anyone operation then comment another operation beacause of they creating error together

// ADDTASK
export default async function addTask() {
        try {
           const userResponse = [{name: 'Neha', details:"Teacher", status:"pending", code:"1235"},
           {name: 'Aarti', details:"Teacher", status:"pending", code:"1236"}]
           await connectDB()
           let spinner = ora(`creating the todos....`).start(); 
           for (let i = 0; i< userResponse.length; i++) {
            const response = userResponse[i];
            await Todos.create(response)
           }   
           spinner.stop()
           console.log(chalk.greenBright('addTask is created....')); 
           }
         catch (error) {
            console.log(`something went wrong`,error);
        }
    }
    const output =  await input()
    console.log(output);



// UPDATE TASK
    export default async function updateTask(taskId, updatedData) {
       try {
          await connectDB();
          const spinner = ora('updating task').start();

          const updatedTaskResult = await Todos.findByIdAndUpdate(taskId, updatedData,{new:true});

          spinner.stop();
          console.log(chalk.greenBright('Task is updated !!!!!!!!'));
          return updatedTaskResult;
       } catch (error) {
            console.error('Error updating task:', error);
       }  
    }
    async function main() {
        const taskId = '65c2464481a30d85db7b770a';
        const updatedData = {name: 'Aarti', details:'Web developer'};
        const updatedTask = await updateTask(taskId, updatedData);
        console.log('Updated task:' , updatedTask);
        const output = await input();
        console.log(output);
    }
    main();



    // READ TASK
    export default async function readTask() {
        try{
            await connectDB();
            const spinner = ora('Fetching tasks from database.....').start();

            const tasks = await Todos.find({});
            spinner.stop();
            console.log('All Tasks:', tasks);
        } catch(error){
            console.log('Error:', error);
        }
    }

    
// DELETE TASK
   export default async function deleteTask(taskId) {
    try {
        const spinner = ora('Deleting task................').start();
        const deletedTask = await Todos.findByIdAndDelete('65c24642491e8c770b0c15b6');
        spinner.stop();

        if (!deletedTask) {
            console.log('Task not found');
        } else {
            console.log('Deleted Task:', deletedTask);
        }
    } catch (error) {
        console.log('Error deleted task:',error);
    }
   }
connectDB()
// use this operation remember that performing single operation comment another operation
deleteTask()
readTask()
addTask()
updateTask()