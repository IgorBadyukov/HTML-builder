const path = require('path');
const fs = require('fs');

const styleFolder = path.join(__dirname, 'styles');
const executeFolder = path.join(__dirname, 'project-dist');
const bundleCSS = path.join(executeFolder, 'bundle.css');

const makeBundle = async () => {
    fs.writeFile(bundleCSS,'', (err) => {
        if (err) {
            console.log(err);
        }
    });
    const files = await fs.promises.readdir(styleFolder, {withFileTypes: true});
    for (let file of files) {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
            const rs = fs.createReadStream(path.join(styleFolder, file.name));
            let data = '';
            rs.on('data', chunk => data += chunk.toString());
            rs.on('end', () => {
                fs.writeFile(bundleCSS, data, { flag: 'a+' }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });

        }
    }
};

makeBundle();