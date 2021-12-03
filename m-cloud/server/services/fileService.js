const fs = require('fs');
const File = require("../models/File");
const config = require("config");

class FileService {
    createDir(req, File) {
        const filePath = this.getPath(req, File);
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: "Файл был создан"});
                } else {
                    return reject({message: "Файл уже создан"});
                }
            } catch (e) {
                return reject({message: 'Ошибка файла'});
            }
        }))
    } 

    deleteFile(req, file) {
        const path = this.getPath(req, file);
        if (file.type === 'dir') {
            fs.rmdirSync(path);
        } else {
            fs.unlinkSync(path);
        }
    }

    getPath(req, file) {
        return req.filePath + "\\" + file.user + "\\" + file.path;
    }
}

module.exports = new FileService();