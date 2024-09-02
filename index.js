import express from "express";

import {findLongestWord,findShortestWord,calculateWordLengths} from "./wordgame.js"

import { totalPhoneBill } from "./totalphone.js";
import {enoughAirtime} from "./enoughAirtime.js"
// create a new express application instance
const  app = express();
// add just below const app = express();
const port = process.env.PORT || 3010;
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));



app.get ('/api/word_game', function(req, res) {
    const sentence = req.query.sentence; 
    const  longestWord = findLongestWord(sentence)
    const shortestWord = findShortestWord(sentence)
    const totalLength = calculateWordLengths(sentence)
    res.json({
        longestWord,
        shortestWord,
        totalLength,

       

    });
});


app.post('/api/total', function(req, res) {
    const phoneString = req.body.bill; // Retrieve the 'bill' string from the request body
    const totalBill = totalPhoneBill(phoneString); // Calculate the total bill
    res.json({
        total: totalBill.toFixed(2), // Return the total bill in the desired format
    });
});

app.post ('/api/total', function(req, res) {
    const phoneString = req.body.bill;
    const totalBill = totalPhoneBill(phoneString);
    res.json({
        totalBill,
       

    });
});


app.get('/api/phonebill/prices', function(req, res) {
    
    const callRate = 2.75;
    const smsRate = 0.65;
    
    
    res.json({
        call: callRate,
        sms: smsRate
    });
});
// Store the rates in an object (this could be stored in a database in a real-world scenario)
let rates = {
    call: 0,
    sms: 0
};

app.post('/api/phonebill/price', function(req, res) {
    const { type, price } = req.body; // Destructure type and price from the request body
    
    // Validate input
    if (!type || price === undefined) {
        return res.status(400).json({
            status: 'error',
            message: "The 'type' and 'price' fields are required."
        });
    }

    if (type !== 'call' && type !== 'sms') {
        return res.status(400).json({
            status: 'error',
            message: "The 'type' must be either 'call' or 'sms'."
        });
    }

    // Set the price for the specified type
    rates[type] = price;

    // Return success message
    res.json({
        status: 'success',
        message: `The ${type} was set to ${price}`
    });
});

app.post('/api/enoughAirtime', function(req, res) {
    const { usage, available } = req.body; // Destructure usage and available from the request body

    // Call the enoughAirtime function with the provided usage and available airtime
    const result = enoughAirtime(usage, available);

    // Return the result in the response
    res.json({
        result: parseFloat(result.replace('R', '')) // Convert the result to a number and return it without the 'R' symbol
    });
});

 


app.listen(port, () =>{
    console.log('server running at http://localhost:3010')
})
