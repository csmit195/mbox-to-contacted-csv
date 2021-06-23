const config = require('./config.json')

const MailParser = require('mailparser').MailParser;
const Mbox = require('node-mbox');
const fs = require('fs');

function log(msg){
    if ( config.print_log ) {
        console.log(msg)
    }
}

function GenerateCSV(){
    const Data = {}
    const stream = fs.createReadStream(config.input);
    const mbox = new Mbox(stream, {});

    log(`Successfully opened ${config.input}, beginning processing! May take up to 10 minutes for very large files (>5gb)`)

    let count = 0
    mbox.on('message', function(msg) {
        let mailparser = new MailParser({ streamAttachments : true });
        mailparser.on('headers', function(headers) {
            let from = headers.get('from');
            if ( from && from.value && from.value[0] ) {
                from = from.value[0].address
            } else {
                from = false
            }
            
            let to = headers.get('to');
            if ( to && to.value && to.value[0] ) {
                to = to.value[0].address
            } else {
                from = false
            }
            
            count++;
            if ( to && from ) {
                Data[to] = Data[to] || {};
                Data[to][from] = true;
                log(`[LOG] processed email #${count}`)
            } else {
                log(`[ERROR] error parsing email ${count}`)
            }
        });
        mailparser.write(msg);
        mailparser.end();
    });


    mbox.on('end', function() {
        let csvString = 'TO EMAIL,FROM EMAIL';
        for ( i=0; i<config.my_emails.length; i++ ) {
            const toAddr = config.my_emails[i];
            if ( toAddr in Data ) {
                for ( const fromAddr in Data[toAddr] ) {
                    let Ignore;
                    if ( ( config.ignore_sent && config.my_emails.includes(fromAddr) ) || ( config.ignore_draft && ( toAddr == '' || fromAddr == '' ) ) ) {
                        Ignore = true
                    }
                    csvString += `\n${toAddr},${fromAddr}`
                }
            }
        }
        fs.writeFileSync(config.output, csvString);
        log('done reading mbox file');
    });
}

GenerateCSV()