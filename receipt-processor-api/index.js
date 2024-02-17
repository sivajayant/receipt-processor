const express = require('express')
const cors = require('cors')
const { randomUUID } = require('crypto');
const fs = require('fs');
const { request } = require('http');


const app = express()
app.use(cors())
app.use(express.json())


app.post('/receipts/process', (req, res) => {
    const body = req.body.body;
    console.log(body)
    const uuid = randomUUID();
    fs.writeFile(`${uuid}.json`, JSON.stringify(body), (err) => {  
        // Catch this!
        if (err) throw err;
        console.log('data saved!');
    });
    return res.status(200).json({
        'success' : true,
        'id' : uuid,
    });
})

app.get('/receipts/:id/points', (req, res) => {
    const uuid = req.params.id;
    var record = ''
    fs.readFile(`${uuid}.json`, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            record = JSON.parse(data);
            console.log(uuid, record);
            let points = 0
        // calculate number of valid alphanumeric chars
            var code, i, len;
            for (i = 0, len = record.retailer.length; i < len; i++) {
            code = record.retailer.charCodeAt(i);
            if ((code > 47 && code < 58) || // numeric (0-9)
                (code > 64 && code < 91) || // upper alpha (A-Z)
                (code > 96 && code < 123)) { // lower alpha (a-z)
                points = points + 1;
            }
            };
            // check if total is rounded
            if (record.total % 1 == 0){
                points = points + 50
            }

            //check if total is multiple of 0.25
            if (record.total % 0.25 == 0){
                points = points + 25
            }

            //check for total pairs in items
            var pairs = Math.floor(record.items.length/2);
            points = points + pairs*5

            //check if item description length is a multiple of 3
            for(const item in record.items){
                if(record.items[item].shortDescription.trim().length % 3 == 0){
                    points = points + Math.ceil(record.items[item].price * 0.2)
                }
            }

            //check if puchaase day is odd
            var purchaseDay = record.purchaseDate.split('-')[2]
            if (purchaseDay % 2 != 0){
                points = points + 6
            }

            //check if puchaase time is between 2PM and 4PM
            var purchaseTime = record.purchaseTime.split(':');
            if ((purchaseTime[0] == 14 && purchaseTime[1] >= 1) || purchaseTime[0] == 15){
                points = points + 10
            }

            return res.status(200).json({
                'success' : true,
                'points' : points,
            });
        } else {
            console.log(err);
            return res.status(200).json({
                'success' : false,
            });
        }
    });
})


app.listen(5174,'localhost' , () => {
    console.log('server is running');
})