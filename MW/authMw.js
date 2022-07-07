const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.get("Authorization").split(" ")[1];

        let decoded = jwt.verify(token, "yummy secret sauce");
        //  console.log(decoded);

        req.role = decoded.role;
        req.id = decoded.id;
        next();
    }
    catch (error) {
        error.message = "You are not authorized to access this resource."
        error.status = 403;
        next(error);
    }
}