const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const host = 'host.json';
const produto = 'produto.json';

// LOGS
const log = {
	"warn": chalk.bgYellow.black,
	"box": chalk.bgWhite.black,
	"green": chalk.bold.green,
	"blue": chalk.bold.blue,
	"red": chalk.bold.red,
	"yellow": chalk.bold.yellow,
	"gray": chalk.bold.gray
};

// READ AND PROCESS JSON
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// DECLARATE EMPTY ARRAY
let array = [];

const rem = ( file, answer ) => {
	let jsonP = file;

	fs.exists(jsonP, (exists) => {
		if (exists) {

			console.log(log.warn('\n' + ' Removendo um novo projeto... ' + '\n'));

			fs.readFile(jsonP, (err, data) => {
				if (err) {
					console.log(log.red(err));

				} else {
					array = JSON.parse(data);					
					
					for (newObj in array) {
                        if (array[newObj].id == parseInt(answer)) {
                            array.splice(newObj, 1);
                        }
                    }

					let json = JSON.stringify(array);
					fs.writeFile(jsonP, json);
				}
			});

		} else {

			console.log(log.warn('\n' + ' Não tem nada para remover... ' + '\n'));

			let json = JSON.stringify(array);
			fs.writeFile(jsonP, json);
		}
	});
}

rl.question(log.blue('\n' + 'Qual ID do projeto para remover? '), (answer) => {

    rem( produto, answer );

    rl.close();
    
});