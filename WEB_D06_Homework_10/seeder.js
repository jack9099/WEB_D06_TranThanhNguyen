const users = require('./data/users');
const products = require('./data/products')
const User = require('./models/userModel');
const Product = require('./models/productModel');
const connectDB = require('./config/db');
connectDB();

const importData = async () => {
    try {
        // create seeder for user
        // await User.deleteMany();
        // await User.insertMany(users);
        // get user admin from database
        const userAdmin = await User.findOne({ email: 'nguyentran9099@gmail.com' });
        // creat seeder for product
        const sampleProducts = products.map((product) => {
            return { ...product, user: userAdmin._id }
        });
        await Product.deleteMany();
        await Product.insertMany(sampleProducts);
        console.log('Data imported success !');
    } catch (error) {
        console.log('Data imported failed !');
    }
}
importData();