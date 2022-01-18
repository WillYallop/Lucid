import * as fs from 'fs-extra';

const path = require('path');
const config = require(path.resolve("./lucid.config.js"));
const themeDir = config.directories.theme;

// ------------------------------------ ------------------------------------
//  Write to file
// ------------------------------------ ------------------------------------
const writeSingleFile = async (target: string, type: 'json', data: any): Promise<boolean> => {
    try {
        const directory = path.resolve(themeDir + target);
        if(type === 'json') {
            let writeData = JSON.stringify(data);
            fs.outputFileSync(directory, writeData);
        }
        return true
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
//  Get single file content
// ------------------------------------ ------------------------------------
const getSingleFileContent = async (target: string, type: 'json') => {
    try {
        const directory = path.resolve(themeDir + target);
        // If file doesnt exist create it
        let checkFileExists = await verifyFileExists(target);
        if(!checkFileExists) {
            if(type === 'json') {
                fs.outputFileSync(directory, JSON.stringify([]));
                return [];
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
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
//  Verify File Exists
// ------------------------------------ ------------------------------------
const verifyFileExists = async (target: string) => {
    try {
        const directory = path.resolve(themeDir + target);
        if (fs.existsSync(directory)) return true
        else return false
    }
    catch(err) {
        throw err;
    }
}

// ------------------------------------ ------------------------------------
// Read Directory
// ------------------------------------ ------------------------------------

const listDirectoryFiles = async (target: string, files_?: Array<cont_the_listDirectoryFiles>): Promise<Array<cont_the_listDirectoryFiles>> => {
    try {
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
    catch(err) {
        throw err;
    }
}

export {
    getSingleFileContent,
    verifyFileExists,
    writeSingleFile,
    listDirectoryFiles
}