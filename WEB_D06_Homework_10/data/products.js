const productArr = [];
for (var i = 0; i < 51; i++) {
    const productObject = {
        name: `San pham so ${i}`,
        image: 'cannon.img',
        description: 'acbaddabcbaca',
        brand: 'Cannon',
        category: 'Electronics',
        price: 9999000,
        countInStock: 0,
        rating: 0,
        numberRewiews: 0
    };
    productArr.push(productObject);
}



module.exports = productArr;