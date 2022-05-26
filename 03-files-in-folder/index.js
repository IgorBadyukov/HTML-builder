const fs = require('fs');
const path = require('path');
const fileWay = path.join(__dirname, 'secret-folder');

const getInfo = async () => {
    try {
        const allFiles = await fs.promises.readdir(fileWay, {withFileTypes: true});
        for (let file of allFiles) {
            const extensionName = path.extname(path.join(__dirname, `secret-folder/${file.name}`));
            const fileName = path.basename(path.join(__dirname, `secret-folder/${file.name}`), extensionName);
            if (file.isFile()) {
                fs.stat(path.join(__dirname, `secret-folder/${file.name}`), (err, stats) => {
                    console.log(`${fileName} - ${extensionName.slice(1)} - ${stats.size}byte`);
                })
            }
        }
    } catch (err) {
        console.error(err);
    }
};

getInfo();
