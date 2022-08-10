import {
    getStaffByEmail,
    getStaff,
    getListStaff,
    createStaff,
    deleteStaff,
    saveStaff
} from "../service/StaffService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const staffController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const staff = await getStaffByEmail(email);
            if (!staff) {
                const error = new Error("Account not exists");
                error.statusCode = 404;
                return next(error);
            }
            if (await bcrypt.compare(password, staff.password)) {
                const accessToken = jwt.sign(
                    { ...staff, password: null },
                    process.env.ACCESS_TOKEN,
                    { expiresIn: "2h", }
                );
                return res.status(200).json({
                    token: accessToken,
                    name: staff.name,
                    email: staff.email,
                });
            } else {
                const error = new Error("Incorrect password");
                error.statusCode = 403;
                return next(error);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            const { name, phone, address, age, gender, email, password, isRoot, active } = req.body;
            console.log(req.body);
            const existedStaff = await getStaffByEmail( email );
            if (existedStaff) {
                return res.status(403).send("Account is already existed");
            }
            const hashPw = await bcrypt.hash(password, 10);
            const newStaff = await createStaff({
                name: name,
                email: email,
                password: hashPw,
                isRoot: isRoot,
                active: active,
                phone: phone,
                address: address,
                age: age,
                gender: gender,
            });
            await saveStaff(newStaff);
            res.status(200).json("Register success");
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getListStaff: async (req, res, next) => {
        try {
            const result = await getListStaff(req.query.page,req.query.limit);
            return res.status(200).json({ msg: "Get list of staff successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getStaff: async (req, res, next) => {
        try {
            const staffId = req.params.id;
            const result = await getStaff(staffId);
            return res.status(200).json({ msg: "Get staff successfully", data: result });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};

export default staffController;