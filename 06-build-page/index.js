const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const assetsFolder = path.join(__dirname, 'assets');
const newAssetsFolder = path.join(projectDist, 'assets');
const componentsFolder = path.join(__dirname, 'components');
const styleFolder = path.join(__dirname, 'styles');
const templateHTML = path.join(__dirname, 'template.html');
const indexHTML = path.join(projectDist, 'index.html');
const styleCSS = path.join(projectDist, 'style.css');

const createDirectory = async (direction) => {
    fs.mkdir(direction, {recursive: true}, (err)=>{
        if (err){
            console.log(err);
        }
    })
}
createDirectory(projectDist);

const createStyle = async () => {
    fs.writeFile(styleCSS,'', (err) => {
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
                fs.writeFile(styleCSS, data, { flag: 'a+' }, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });

        }
    }
};
createStyle();

const copyAssets = async (direction, newDirection) => {
    createDirectory(newDirection);
    const files = await fs.promises.readdir(direction, {withFileTypes: true});
    for (let file of files) {
        if (file.isFile()) {
            fs.copyFile(path.join(direction, file.name), path.join(newDirection, file.name), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        else {
            copyAssets(path.join(direction, `${file.name}`), path.join(newDirection, `${file.name}`));
        }
    }
};
copyAssets(assetsFolder, newAssetsFolder);

const createHTML = async () => {
    const componentsFile = await fs.promises.readdir(componentsFolder, {withFileTypes: true});
    const rs = fs.createReadStream(templateHTML);
    const ws = fs.createWriteStream(indexHTML);

    rs.on('data', async (data) => {
        const replacedHtml = await replaceTagsAll();
        ws.write(replacedHtml);
        async function replaceTagsAll() {
            let htmlText = data.toString();
            for (const component of componentsFile) {
                const componentText = await fs.promises.readFile(path.join(componentsFolder, component.name));
                htmlText = htmlText.replace(`{{${component.name.split('.')[0]}}}`, componentText);
            }
            return htmlText;
        }
    });
};
createHTML();


