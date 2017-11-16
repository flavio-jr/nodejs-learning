const fs = require('fs')
const writeStream = fs.createWriteStream('./log.txt', {
    flags: 'a',
    econding: 'utf8',
    mode: 0666
})

/**
 * Read 'data' dir and replace
 */
writeStream.on('open', () => {
    fs.readdir('./data', (err, files) => {
        if (err) {
            return console.log(err.message)
        }

        let counter = 0;

        files.forEach(function (name) {
            fs.stat('./data/' + name, function (err, stats) {
                if (err) return err;
                
                if (!stats.isFile()) {
                    counter++;
                    return;
                }

                fs.readFile('./data/' + name, 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err.message);
                    }
    
                    let adjData = data.replace(/(\w+)[^(\.com\s)]/g, 'burningbird.net')
    
                    fs.writeFile('./data/' + name, adjData, function (err) {
                        if (err) return console.log(err)
    
                        writeStream.write('changed ' +name + "\n\n", 'utf8', function (err) {
                            if (err) return console.log(err)
    
                            console.log('finished ' + name);
                            counter++;
    
                            if (counter >= files.length) {
                                console.log('all finished');
                            }
                        })
                    })
                })

            })
        })
    })
})

writeStream.on('error', function (err) {
    console.log('ERROR: ' + err)
})
