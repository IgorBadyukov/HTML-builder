const fs = require('fs');
const path = require('path');
const fileWay = path.join(__dirname, 'secret-folder');

const getInfo = async () => {
    try {
        const allFiles = await fs.promises.readdir(fileWay, {withFileTypes: true});
        for (let file of allFiles) {
            if (file.isFile()) {
                fs.stat(path.join(__dirname, `secret-folder/${file.name}`), (err, stats) => {
                    console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size}byte`);
                })
            }
        }
    } catch (err) {
        console.error(err);
    }
};

getInfo();
