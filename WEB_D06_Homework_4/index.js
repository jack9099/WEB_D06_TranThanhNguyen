const express = require('express');
const app = express();
const port = 3002;
const userRouter = require('./router/userRouter');

app.use(express.json());
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log('Express listening at port', port);
})
