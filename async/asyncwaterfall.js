const fs = require('fs'),
    async = require('async'),
    _dir = './data/'

const writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    encoding: 'utf8',
    mode: 0666
})

async.waterfall([
    function readDir (callback) {
        fs.readdir(_dir, function (err, files) {
            callback(err, files)
        })
    },

    function loopFiles (files, callback) {
        let name = '';

        files.forEach(function (name) {
            callback (null, name)
        })
    },

    function checkFile (file, callback) {
        fs.stat(_dir + file, function (err, stats) {
            callback(err, stats, file)
        })
    },

    function readData (stats, file, callback) {
        if (stats.isFile()) {
            fs.readFile(_dir + file, 'utf8', function (err, data) {
                callback(err, file, data)
            })
        }
    },

    function modify (file, text, callback) {
        let adjData = text.replace(/somecompany\.com/g, 'burningbird.net')
        callback(null, file, adjData)
    },

    function writeData (file, text, callback) {
        fs.writeFile(_dir + file, text, function (err) {
            callback(err, text)
        })
    },

    function logChange (file, callback) {
        writeStream.write('changed ' + file + '\n', 'utf8', function (err) {
            callback(err)
        })
    }

], function (err, result) {
    if (err) return console.log(err.message)

    return console.log(result);
})

