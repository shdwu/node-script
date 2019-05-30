const yaml = require('js-yaml');
const path = require('path');
const fs = require('fs');

const jsonYaml = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './swagger-ciie.yaml'), 'utf8'))
fs.unlinkSync('./parse.txt')
const props = jsonYaml.definitions.PersonAbroad.properties;
for(var item in props) {
    fs.appendFileSync('./parse.txt', '//' + props[item].description + '\n');
    fs.appendFileSync('./parse.txt', 'public ' + props[item].type + ' ' + item + ';\n');
}