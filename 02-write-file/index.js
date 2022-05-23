const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output, exit: exit } = require('process');
const fileWay = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({ input, output });

function write() {
    rl.question('\nWrite text in file (exit and Ctrl+C to end): ', (answer) => {
        fs.writeFile(fileWay, `${answer}\n`, { flag: 'a+' }, function (err) {
            if (err) {
                return console.log(err);
            }
            if (answer === 'exit') {
                sayBye();
            }
            write();
        });
    });
    rl.on('SIGINT', sayBye);
}
write();

function sayBye() {
    console.log('\nHave a nice day!');
    exit();
}