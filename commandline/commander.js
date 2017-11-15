const commander = require('commander')

commander
    .version('0.0.1')
    .command('set <keyword> [otherKeywords...]')
    .action( ( keyword, otherKeywords ) => {
        console.log('keyword %s', keyword)

        if (otherKeywords) {
            otherKeywords.forEach(function (oKey) {
                console.log('keyword %s', oKey)
            })
        }
    })

commander.parse(process.argv)