import fs from "fs";
import path from "path";

import chalk from "chalk";
import fse from "fs-extra";
import inquirer from "inquirer";

import { paths } from "./paths.js";

let fileName = process.argv[2];
const currentDir = process.cwd();
let workDir = path.join(currentDir, fileName);

const askFileName = async () => {
    const inputFileName = await inquirer
        .prompt([
                {
                    name: "fileName",
                    message: "Enter extention name",
                }
        ])
        .then(answers => {
            return answers.fileName;
        });
    return inputFileName;
}

if(typeof fileName === "undefined") {
    fileName = await askFileName();
}

while(fs.existsSync(workDir)) {
    console.log("The same file name already exists. Please try again with a different name.");
    fileName = await askFileName();
    workDir = path.resolve(currentDir, fileName);
}

// select bowserType
const selectBrowser = "chrome";

const copyFiles = async () => {
    await fs.mkdir(workDir, err => {
        if (err) console.error(err);
    });

    const templateDir = paths.templates[selectBrowser];
    const templateFileNames = fs.readdirSync(templateDir, {withFileTypes: true})
                    .filter(dirent => dirent.isFile()).map(({name}) => name);
    templateFileNames.map(fileName => {
        const src = path.resolve(templateDir, fileName);
        const dest = path.resolve(workDir, fileName);
        fs.copyFile(src, dest, fs.constants.COPYFILE_EXCL, err => {
            if (err) console.error(err);
        });
    });

    const copyIcons = () => {
        const src = paths.assets.images;
        const dest = path.resolve(workDir, "images");
        fse.copy(src, dest, err => {
            if (err) console.error(err);
        });
    }
    copyIcons();
    return;
}
await copyFiles();

console.log();
console.info(chalk.magenta("🌈 create extention!"));
console.log();