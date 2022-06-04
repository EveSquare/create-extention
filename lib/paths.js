import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const paths = {
    assets: {
        images: path.resolve(__dirname, '../assets/images'),
    },
    templates: {
        chrome: path.resolve(__dirname, '../templates/chrome'),
        firefox: path.resolve(__dirname, '../templates/firefox'),
    }
};