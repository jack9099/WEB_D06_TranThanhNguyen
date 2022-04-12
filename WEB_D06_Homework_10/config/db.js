const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1/shop-ecommerce');
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log('Error to connect mongoDB!');
    }
};

module.exports = connectDB;