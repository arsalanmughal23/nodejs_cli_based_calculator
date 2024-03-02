#!/usr/bin/env node

import inquirer from 'inquirer';

let firstValue;
let selectedOperator;
let secondValue;

async function askValue(variableName){
    const answer = await inquirer.prompt({
        name: variableName,
        type: 'input',
        message: `Enter ${variableName.replace('_', ' ')}: `,
        default(){
            return 0;
        },
        validate: function (input) {
            const value = parseFloat(input);
            if(!isNaN(value)){
                return true;
            } else {
                return 'You need to provide a number';
            }
        }
    });

    switch(variableName){
        case 'first_value':
            firstValue = await getNumber(answer.first_value);
        case 'second_value':
            secondValue = await getNumber(answer.second_value);
        default:;
    }
}

async function getNumber(value){
    value = parseFloat(value);
    if(!isNaN(value)){
        return value;
    } else {
        return null;
    }
}

async function askOperator(){
    const answer = await inquirer.prompt({
        name: 'operator',
        type: 'list',
        message: 'Select an Operator',
        choices: ['+', '-', '/', '*']
    });
    selectedOperator = answer.operator;
}

async function runCalculator(){
    await askValue('first_value');
    await askOperator();
    await askValue('second_value');
    let result = eval(`${firstValue} ${selectedOperator} ${secondValue}`);

    console.log(`${firstValue} ${selectedOperator} ${secondValue} = ${result}`);

    let answer = await inquirer.prompt({
        name: 'is_continue',
        type: 'list',
        message: 'Do you want to continue?',
        choices: ['Yes', 'No']
    });
    
    if(answer.is_continue == 'Yes'){
        await runCalculator();
    }else{
        process.exit(1);
    }
}

await runCalculator();