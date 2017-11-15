"use strict"

const util = require('util')
const eventEmitter = require('events').EventEmitter;
const fs = require('fs');

/**
 * @class InputChecker
 * @param {string} name 
 * @param {string} file 
 */
function InputChecker (name, file) {
    this.name = name;

    this.writeStream = fs.createWriteStream('./' + file + '.txt', {
        flags: 'a',
        encoding: 'utf8',
        mode: 0o666
    })
}

//Faz a classe InputChecker herdar de EventEmitter
util.inherits(InputChecker, eventEmitter)

InputChecker.prototype.check = function check (input) {
    let command = input.trim().substr(0, 3);
    
    switch (command) {
        //Escreve no arquivo
        case 'wr:':
            this.emit('write', input.substr(3, input.length))
            break;
        
        //Encerra o processo
        case 'en:':
            this.emit('end')
            break;

        //Manda o input para o console
        default:
            this.emit('echo', input)
            break;

    }
}

let ic = new InputChecker('C3PO', 'translations')

ic.on('write', function ( data ) { 
    this.writeStream.write(data, 'utf8')
})

ic.on('echo', ( data ) => process.stdout.write(ic.name + ' wrote: ' + data) )

ic.on('end', () => process.exit() )

process.stdin.setEncoding('utf8');

//Ouve o evento de entrada de texto
process.stdin.on('readable', () => {
    let input = process.stdin.read()
    
    if (input) ic.check(input)
})



