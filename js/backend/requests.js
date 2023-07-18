"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGopher = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getGopher = async () => {
    const gopher = await fetch("http://localhost:8080/gopher/random")
        .catch((err) => {
        console.log(err);
        return null;
    });
    if (gopher === null) {
        return { error: "idk" };
    }
    const gopherBuffer = Buffer.from(await gopher.arrayBuffer());
    const imgPath = path_1.default.join(__dirname, '../../ressources', "random.jpg");
    console.log(imgPath);
    fs_1.default.writeFile(imgPath, gopherBuffer, {}, () => { console.log("ahahaha"); });
};
exports.getGopher = getGopher;
