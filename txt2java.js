const path = require('path')
const fs = require('fs')
const readline = require('readline');

readFileToArr('./sourceDocument.txt', arr => {
  var parseLine = [];
  arr.forEach(v => {
    parseLine.push(convertLine(v));
    parseLine.push("")
  })
  fs.unlinkSync('./parse.txt')
  
  parseLine.forEach( p => {
    fs.appendFileSync('./parse.txt', '//' + p + '\n');
  })
})



function convertLine(line) {
  line = line.trim()
  var lineArr = line.split(' ')
  var convertLineArr = []
  convertLineArr.push(`// ${lineArr[1]}`)
  convertLineArr.push(`@Column(name = "${lineArr[0]}", length = 100)`)
  convertLineArr.push(`private String ${lineArr[0]};`)
  return convertLineArr
}

/**
 * 将文本文件分行读入数组中，返回数组
 * @param {文件名, 相对__dirname} fileName 
 * @param {回调函数} callback 
 */
function readFileToArr(fileName, callback) {
  var filePath = path.relative(__dirname, fileName)
  var rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  });
  var arr = []
  rl.on('line', (line) => {
    arr.push(line)
  });
  rl.on('close', () => {
    callback(arr)
  })
}