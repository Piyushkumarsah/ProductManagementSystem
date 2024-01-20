const mongoose = require('mongoose');
const express = require('express');
const Cors = require('cors');
const Product = require('./product');
const User = require('./user');
const jwt = require('jsonwebtoken');
const jwtkey = process.env.JWT_SECRET || 'dashboard';
const app = express();

app.use(Cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db3');
const comparePasswords = async (providedPassword, storedPassword) => {
    try {
        return providedPassword === storedPassword ? true : false;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};
app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User Not Found' });
        }

        const storedPassword = user.password;


        const isPasswordValid = await comparePasswords(password, storedPassword);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Wrong Password' });
        }
        else {
            jwt.sign({ user }, jwtkey, { expiresIn: '3h' }, (err, token) => {
                if (err) {
                    return res.send("Token not generated");
                }
                return res.status(200).json({ message: 'Login successfull', user, token });
            })
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/Register', async (req, res) => {
    try {
        let data = new User(req.body);
        let result = await data.save();
        console.log(result);
        jwt.sign({ data }, jwtkey, { expiresIn: '3h' }, (err, token) => {
            if (err) {
                return res.send("Token not generated successfully");
            }
            return res.status(200).json({ message: 'Login successfull', data, token });
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                error: 'Email is already registered',
                message: 'The email address provided is already in use. Please use a different email for registration.'
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/add-products', verifytoken, async (req, res) => {
    try {
        const { name, price, company } = req.body;
        console.log({ name });
        let present = await Product.findOne({ name });
        if (present) {
            return res.status(400).json({ error: 'Product already Available' });
        }
        let product = new Product(req.body);

        let result = await product.save();
        console.log(result);
        res.status(200).json({ message: "Product Updated", error: 'Successfully Updated' });
    }
    catch (err) {
        return res.status(400).json({
            error: 'Not updated'
        });
    }
});
app.get('/getproductlist', verifytoken, async (req, res) => {
    try {
        const productData = await Product.find();
        if (productData.length > 0) {
            res.json(productData);
        } else {
            res.status(404).send("No data available");
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
        res.status(500).send("Internal Server Error");
    }
});
app.put('/updateproduct', verifytoken, async (req, res) => {
    try {
        const productId = (req.body._id);
        const updatedProduct = req.body;

        const result = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (result) {
            res.status(200).json({ message: "Updated" });
        }
        else {
            res.status(404).send("Server Error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }
});
app.delete('/deleteproduct', verifytoken, async (req, res) => {
    const itemId = req.body.itemId;
    const result = await Product.findByIdAndDelete(itemId);
    if (result) {
        res.status(200).send("Successfully Deleted");
    }
    else {
        res.status(404).send({ message: "Item not deleted", error: "Probably server error" })
    }

})
function verifytoken(req, res, next) {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('No authorization token');
    }

    token = token.split(' ')[1];

    jwt.verify(token, jwtkey, (err, decoded) => {
        if (err) {
            console.error('Session Expired:-', err);
            return res.status(404).send({ message: "Session Expp", error: "Session Exp" });
        } else {
            req.user = decoded.user;
            next();
        }
    });
}
