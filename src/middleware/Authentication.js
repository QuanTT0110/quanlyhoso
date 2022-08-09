import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        const error = new Error(
            "A token is required for authentication"
        );
        error.statusCode = 401;
        return next(error);
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.staff = decoded;
    } catch (error) {
        console.error("Name error:" + error.name);
        return next(error);
    }
    next();
};

export const verifyRoot = async (req, res, next) => {
    try {
        if (!req.staff) {
            const error = new Error(
                "Something went wrong while verifying the root staff accessToken"
            );
            error.statusCode = 401;
            return next(error);
        }
        if (!req.staff.isRoot) {
            const error = new Error("User is not a root staff");
            error.statusCode = 403;
            return next(error);
        }
        next();
    } catch (error) {
        console.error("Name error:" + error.name);
        return next(error);
    }
};
