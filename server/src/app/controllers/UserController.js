const User = require('../models/User');
// const { mongooseToObject } = require('../../util/mongoose');
const argon2 = require('argon2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// import { isAuth, isAdmin, generateToken } from '../../util/utils';
const isAuth = require('../../util/utils');
const isAdmin = require('../../util/utils');
const generateToken = require('../../util/utils');
class UserController {

    async FindAll(req, res, next) {
        const users = await User.find({});
        res.send(users);
    }
    async FindOneId(req, res, next) {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    }

    //[GET] 
    // @desc Check if user is logged in
    //@access Public
    async check(req, res, next) {
        try {

            const user = await User.findById(req.userId).select('-password')
            if (!user)
                return res
                    .status(400)
                    .json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res
                .status(500)
                .json({ success: false, message: 'Internal server error' })
        }
    }

    // [POST] register
    async register(req, res, next) {
        const { email, password, isAdmin } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Missing email or password' })
        try {

            const user = await User.findOne({ email });

            // user.findOne({email})
            //     .then(() => res.status(400).json({ success: false, message: 'email alredy taker' }))
            //     .catch(error => {

            // });
            if (user)
                return res.status(400).json({ success: false, message: 'email alredy taker' })

            const hashPassword = await argon2.hash(password);
            const newUser = new User({ email, password: hashPassword, isAdmin });

            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            await newUser.save()
                .then(() => res.json({ success: true, message: 'User created success successfuly', accessToken }))
                .catch(error => {

                });



        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }


    }


    async login(req, res, next) {
        const { email, password } = req.body;

        // Simple validation
        if (!email || !password)
            return res
                .status(400)
                .json({ success: false, message: 'Missing email or password' })

        try {
            //     //  check for exsting user
            const user = await User.findOne({ email })
            if (!user)
                return res.status(400).json({ success: false, message: 'Incorect email or password' })
            //     // email found
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid)
                return res.status(400).json({ success: false, message: 'Incorect email or password' })
            // All good

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                message: 'User logged in successfuly',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }
    }
    async editAdmin(req, res, next) {
        const user = await User.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);
            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    }
    async delete(req, res, next) {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin) {
                res.status(400).send({ message: 'Can Not Delete Admin User' });
                return;
            }
            await user.remove();
            res.send({ message: 'User Deleted' });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    }
    //[POST] signin
    async signin(req, res, next) {
        try {
            //  check for exsting user
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken(user),
                    });
                    return;
                }
            }
            res.status(400).send({ success: false, message: 'Incorect email or password' });
        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, message: 'internal server error' })
        }
    }
    //[POST] signup
    async signup(req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send({ message: 'email alredy taker' });
            return;
        }
        try {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            });

            const user = await newUser.save();
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                toKen: generateToken(user),
            });

        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, message: 'internal server error' })
        }

    }

    async edit(req, res, next) {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }

            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    }

}
module.exports = new UserController;