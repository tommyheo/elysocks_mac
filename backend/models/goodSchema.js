const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
    name: {
        type: 'String',
        require: true,
    },
    description: {
        type: 'String',
        require: true,
    },
    price: {
        type: 'Number',
        require: true,
    },
    category: {
        type: 'String',
        enum: ['elysgoods, customs, socks']
    }
})