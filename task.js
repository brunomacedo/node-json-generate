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

const addFile = ( file, answer, answer2 ) => {
	let jsonP = file;

	fs.exists(jsonP, (exists) => {
		if (exists) {

			console.log(log.warn('\n' + ' Adicionando um novo projeto... ' + '\n'));

			fs.readFile(jsonP, (err, data) => {
				if (err) {
					console.log(log.red(err));

				} else {
					array = JSON.parse(data);

					console.log(
						log.box('                       ')+
						'\n \n' + log.green('id: ') + log.yellow(array.length + 1) +
						'\n' + log.green('projeto: ') + log.yellow(answer2.replace(/\s/g, '-')) +
						'\n' + log.green('em: ') + log.yellow(answer.replace(/\s/g, '-')) + '\n \n' +
						log.box('                       ')
					);
					
					array.push({
						"id": (array.length + 1),
						"project": answer.replace(/\s/g, '-'),
						"name": answer2.replace(/\s/g, '-')
					});

					let json = JSON.stringify(array);
					fs.writeFile(jsonP, json);
				}
			});

		} else {

			console.log(log.warn('\n' + ' Criando o arquivo projetos .json... ' + '\n'));

			console.log(
				log.box('                       ')+
				'\n \n' + log.green('id: ') + log.yellow('1') +
				'\n' + log.green('projeto: ') + log.yellow(answer2.replace(/\s/g, '-')) +
				'\n' + log.green('em: ') + log.yellow(answer.replace(/\s/g, '-')) + '\n \n' +
				log.box('                       ')
			);

			array.push({
				"id": 1,
				"project": answer.replace(/\s/g, '-'),
				"name": answer2.replace(/\s/g, '-')
			});

			let json = JSON.stringify(array);
			fs.writeFile(jsonP, json);
		}
	});
}

rl.question(log.blue('\n' + 'Que tipo de projeto? '), (answer) => {

	rl.question(log.blue('Qual nome? '), (answer2) => {

		if( answer === 'host' ){
			addFile( host, answer, answer2 );

		} else if ( answer === 'pp' ) {
			addFile( produto, answer, answer2 );

		} else {
			console.log(log.warn('\n' + '  Selecione um tipo de projeto.  ' + '\n'));

		}
		
		rl.close();
	});
});