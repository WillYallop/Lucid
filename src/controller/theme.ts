import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// ------------------------------------ ------------------------------------
//  Write to file
// ------------------------------------ ------------------------------------
const writeSingleFile = async (target: string, type: 'json', data: any): Promise<boolean> => {
    const directory = path.resolve(themeDir + target);
    try {
        if(type === 'json') {
            let writeData = JSON.stringify(data);
            fs.outputFileSync(directory, writeData);
            return true
        }
    }
    catch {
        return false
    }
    return false
}

// ------------------------------------ ------------------------------------
//  Get single file content
// ------------------------------------ ------------------------------------
const getSingleFileContent = async (target: string, type: 'json') => {
    const directory = path.resolve(themeDir + target);
    // If file doesnt exist create it
    let checkFileExists = await verifyFileExists(target);
    if(!checkFileExists) 
    {
        if(type === 'json') {
            fs.outputFileSync(directory, JSON.stringify([]));
        }
    }
    // Get file data - if empty return empty array if json
    let data = fs.readFileSync(directory);
    if(type === 'json') {
        let resData = data.toString();
        if(!resData.length) return [];
        else return JSON.parse(resData);
    }
    else return data;
}

// ------------------------------------ ------------------------------------
//  Verify File Exists
// ------------------------------------ ------------------------------------
const verifyFileExists = async (target: string) => {
    const directory = path.resolve(themeDir + target);
    if (fs.existsSync(directory)) return true
    else return false
}

// ------------------------------------ ------------------------------------
// Read Directory
// ------------------------------------ ------------------------------------

const listDirectoryFiles = async (target: string, files_?: Array<cont_the_listDirectoryFiles>): Promise<Array<cont_the_listDirectoryFiles>> => {
    files_ = files_ || [];
    const directory = path.resolve(themeDir + target);

    // Will list all files names inside the target directory
    let files = await fs.readdir(directory);
    for await(let file of files){
        let filePath = directory + '/' + file;
        let stat = await fs.stat(filePath);
        let isDirectory = stat.isDirectory();
        if (isDirectory) files_ = await listDirectoryFiles(target + '/' + file, files_)
        else files_.push({
            file_name: file,
            file_path: target + '/' + file
        });
    }
    return files_;
}

export {
    getSingleFileContent,
    verifyFileExists,
    writeSingleFile,
    listDirectoryFiles
}