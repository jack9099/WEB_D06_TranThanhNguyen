const express = require('express');
const userRouter = express.Router();
const { body, validationResult } = require('express-validator');

// List of user
const users = [
    {
        id: '1',
        name: 'Tran Thanh Nguyen',
        age: '24',
        email: 'nguyentran9099@gmail.com',
        gender: '0'
    },
    {
        id: '2',
        name: 'Tran Thanh Nguyen 2',
        age: '22',
        email: '2nguyentran9099@gmail.com',
        gender: '1'
    },
    {
        id: '3',
        name: 'Tran Thanh Nguyen 3',
        age: '21',
        email: '3nguyentran9099@gmail.com',
        gender: '2'
    }
];

// GET
    // get all users
userRouter.get('/', function(req, res) {
    res.send(users);
})
    // get user by id
userRouter.get('/:id', function(req, res) {
    res.send(users);
})

// POST
userRouter.post('/post',
    // Tên ít nhất 1 kí tự
    body('name').isLength({min: 1}).withMessage('Tên phải có ít nhất 1 kí tự'),
    // Tuổi trong khoảng từ 1 đến 200. Không âm
    body('age').isInt({min: 1, max: 200}).withMessage('Tuổi từ 1 đến 200.'),
    // Email dạng @example.com
    body('email').isEmail().withMessage('Email phải có dạng @example.com.'),
    // Giới tính 0 ,1 hoặc 2
    body('gender').isIn([0, 1, 2]).withMessage('Chỉ được nhập 0, 1 và 2. 0: nam, 1: nữ. 2: không xác định.'),
    

    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };

        const newUser = {
        id: `${users.length + 1}`,
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        gender: req.body.gender
        };
    users.push(newUser);
    res.send(users);
});

// PUT
userRouter.put('/put/:id',
    // Tên ít nhất 1 kí tự
    body('name').isLength({min: 1}).withMessage('Tên phải có ít nhất 1 kí tự'),
    // Tuổi trong khoảng từ 1 đến 200. Không âm
    body('age').isInt({min: 1, max: 200}).withMessage('Tuổi từ 1 đến 200.'),
    // Email dạng @example.com
    body('email').isEmail().withMessage('Email phải có dạng @example.com.'),
    // Giới tính 0 ,1 hoặc 2
    body('gender').isIn([0, 1, 2]).withMessage('Chỉ được nhập 0, 1 và 2. 0: nam, 1: nữ. 2: không xác định.'),

    function(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        };
        
        const id = req.params.id;
        const user = users.find((u) => {
            return u.id === id;
        })

        if (id > 0 && id <= users.length) {
            user.name = req.body.name;
            user.age = req.body.age;
            user.email = req.body.email;
            user.gender = req.body.gender;

            res.send(users);
        } else {
            return res.status(400).json({ errors: 'Không tìm thấy user' })
        };  
    } 
);

// DELETE 
userRouter.delete('/delete/:id', function(req, res) {
    const id = req.params.id;

    if (id > 0 && id <= users.length) {
        users.splice(id -1, 1);

        // update user id
        for (i = 0; i < users.length; i++) {
            users[i].id = i + 1;
        }

        res.send(users);
    } else {
        return res.status(400).json({ errors: 'Không tìm thấy user' })
    }
})


module.exports = userRouter;