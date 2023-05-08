const users = require("../models/users");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.getUser = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const user = await users.find();
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const setCookie = (token, res) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.cookie("jwt", token, options);
};

exports.register = async (req, res) => {
  try {
    const user = await users.create(req.body);
    const token = signToken(user._id);
    setCookie(token, res);
    console.log(req.body);
    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  try {
    const { usernameoremail, password } = req.body;
    if (!usernameoremail || !password) {
      return res.status(400).json({
        status: "failure",
        data: "please provide a usernameoremail and password",
      });
    }

    const user = await users
      .findOne({
        $or: [{ username: usernameoremail }, { email: usernameoremail }],
      })
      .select("+newpassword");

    if (user && user.newpassword == req.body.password) {
      const token = signToken(user._id);
      setCookie(token, res);
      res.status(200).json({
        status: "success",
        token,
        data: "Your are logged In",
      });
    } else {
      res.status(401).json({
        status: "failure",
        data: "Login failure email or password is incorrect",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

exports.protectuser = async (req, res, next) => {
  //  getting token
  let token;
  try {
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "failure",
        data: "you not loged in please login to access feature",
      });
    }

    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // user exists
    const freshUser = await users.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "failure",
        data: "user belonging to tgis token is not available",
      });
    }

    // password changed recently
    if (freshUser.passwordchangedrecently(decoded.iat)) {
      return res.status(401).json({
        status: "failure",
        data: "you changed password recently you need to login again",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "failure",
      data: "Token is invalid",
    });
  }
  next();
};

exports.protectadmin = async (req, res, next) => {
  //  getting token
  let token;
  try {
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "failure",
        data: "you not loged in please login to access feature",
      });
    }

    // verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // user exists
    const freshUser = await users.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "failure",
        data: "Admin belonging to this token is not available",
      });
    }

    if (!freshUser.isadmin) {
      return res.status(401).json({
        status: "failure",
        data: "Your are not a admin",
      });
    }

    // password changed recently
    if (freshUser.passwordchangedrecently(decoded.iat)) {
      return res.status(401).json({
        status: "failure",
        data: "you changed password recently you need to login again",
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: "failure",
      data: "Token is invalid",
    });
  }
  next();
};
