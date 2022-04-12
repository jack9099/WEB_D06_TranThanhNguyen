const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// 1. Get all product
const getProducts = asyncHandler( async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword}} : {};
    const countProducts = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({
        products,
        countProducts,
        page
    });
});

// 2. Create a product
const createProduct = asyncHandler( async (req, res) => {
    const { name, description, price, image, brand, category, countInStock } = req.body;
    const { _id } = req.user;
    const product = new Product({
        user: _id,
        name: name,
        description: description,
        price: price,
        image: image,
        brand: brand,
        category: category,
        countInStock: countInStock
    });
    const resultProduct = await product.save();
    res.status(200).json(resultProduct);
});

// 3. Create a review for product
const createReview = asyncHandler( async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user._id;

    // Check id exist in database
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Product does not exist!');
    } else {
    const product = await Product.findById(productId);
    if (product) {
        // Check user reviewed or not
        const isReview = product.reviews.find((review) => review.user.toString() === userId.toString());
        if (isReview) {
            res.status(400);
            throw new Error('You already reviewed for this product!');
        };

        // Luu thong tin nguoi da review vao cot review trong product
        const reviewContent = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
            user: userId
        }
        product.reviews.push(reviewContent);

        // Tinh toan so luong nguoi da review san pham -> Luu vao cot numReview trong bang product
        product.numReviews = product.reviews.length;

        // Tinh toan rating trung binh
        const ratingArr = [];
        for (let i = 0; i < product.reviews.length; i++) {
            ratingArr.push(product.reviews[i].rating)
        };
        const averageRating = ratingArr.reduce((total, amount, index, array) => {
            total += amount;
            if (index === array.length - 1) {
                return total / array.length;
              } else {
                return total;
              }
        });
        product.rating = Math.round(averageRating * 100) / 100;
        
        // Thong bao ket qua review ve client
        await product.save();
        res.status(200).json({
            message: "Review successfully!"
        });
    } else {
        res.status(400);
        throw new Error('Product not found!');
    }
}
});

// 4. Get product by Id
const getProductById = asyncHandler( async (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Product does not exist!');
    } else {
        const productById = await Product.findById(productId).exec();
        if (productById) {
            res.status(200).json({
            productById
            });
        } else {
            res.status(400);
            throw new Error('Product does not exist!');
        } 
    }; 
});

// 5. Delete product by Id
const deleteProductById = asyncHandler( async (req, res) => {
    const productId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Product does not exist!');
    } else {
        const productById = await Product.findByIdAndDelete(productId);
        console.log(productById);
        if (productById) {
            res.status(200).json({
                message: 'Product deleted!'
            });
        } else {
            res.status(400);
            throw new Error('Product does not exist!');
        }
    };
});  

// 6. Update product by Id
const updateProductById = asyncHandler( async (req, res) => {
    const productId = req.params.id;
    const updateObj = req.body;
    console.log(updateObj);
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400);
        throw new Error('Product does not exist!');
    } else {
        const productById = await Product.findByIdAndUpdate(productId, updateObj);
        console.log(productById);
        if (productById) {
            res.status(200).json({
                message: 'Product updated!'
            });
        } else {
            res.status(400);
            throw new Error('Product does not exist!');
        }
    };
});

// 7. Get top 10 products
const getTopProducts = asyncHandler( async (req, res) => {
    const topProduct = await Product.aggregate([
        {
            $sort : { numReviews : -1, rating: -1, name: 1 }
        },
        {
            $limit : 10
        }
    ]);
    res.status(200).json({
        message: 'Top 10 products by reviews',
        topProduct
    });
});

module.exports = {
    getProducts,
    createProduct,
    createReview,
    getProductById,
    deleteProductById,
    updateProductById,
    getTopProducts
}