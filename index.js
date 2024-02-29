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
        /* Legacy way: with this.async */
        validate: async function (input) {
            // Declare function as asynchronous, and save the done callback
            const done = this.async();

            // Do async stuff
            if (typeof await getNumber(input) !== 'number') {
                // Pass the return value in the done callback
                done('You need to provide a number');
            } else {
                // Pass the return value in the done callback
                done(null, true);
            }
        }
    });
    async function getNumber(value){
        value = parseFloat(value);
        if(!isNaN(value)){
            return value;
        } else {
            return null;
        }
    }

    switch(variableName){
        case 'first_value':
            firstValue = await getNumber(answer.first_value);
        case 'second_value':
            secondValue = await getNumber(answer.second_value);
        default:;
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

await askValue('first_value');
await askOperator();
await askValue('second_value');
let result = eval(`${firstValue} ${selectedOperator} ${secondValue}`);

console.log(`${firstValue} ${selectedOperator} ${secondValue} = ${result}`);