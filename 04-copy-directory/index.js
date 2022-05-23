const fs = require('fs');
const path = require('path');

const dir = path.resolve( __dirname, 'files');
const newDir = path.join( __dirname, 'files-copy');

fs.promises.rm(newDir, {recursive:true, force:true}, (err)=>{
    if (err) {
        console.log(err);
    }
}).then(()=>{
    copyDir()
})

const copyDir = async () => {
    fs.mkdir(path.join( __dirname, 'files-copy'), {recursive: true}, (err)=>{
        if (err){
            console.log(err);
        }
    })
    const files = await fs.promises.readdir(dir, {withFileTypes: true});
    for (let file of files) {
        fs.copyFile(path.join(dir, file.name), path.join(newDir, file.name), (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}