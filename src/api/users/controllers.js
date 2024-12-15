const jwt = require("jsonwebtoken");
const helpers = require("../../utils/helpers");
const { User } = require("./models");

async function postUser(req, res) {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "user with this email already exists" });
    }

    user = await User.create({
      name,
      email,
      password: helpers.getHash(password),
    });

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function patchUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = res.locals.user;

    user.name = name ?? user.name;

    if (email && user.email !== email) {
      let _user = await User.findOne({ email });
      if (_user) {
        return res
          .status(409)
          .json({ message: "user with this email already exists" });
      }
      user.email = email;
    }

    let token;
    if (password && user.password !== helpers.getHash(password)) {
      user.password = helpers.getHash(password);
      token = jwt.sign(
        { id: user._id, hash: user.password.slice(-10) },
        process.env.JWT_SECRET
      );
    }
    await user.save();

    user.password = undefined;
    return res.json({ message: "user updated successfully", user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function getUser(req, res) {
  try {
    const user = res.locals.user;
    user.password = undefined;
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function putUserPhoto(req, res) {
  try {
    const user = res.locals.user;
    if (user.photo) {
      helpers.deleteFile(user.photo);
    }
    const photo = req.files.photo[0];
    user.photo = `/uploads/${photo.filename}`;
    await user.save();

    user.password = undefined;
    return res.json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function deleteUserPhoto(req, res) {
  try {
    const user = res.locals.user;
    if (!user.photo) {
      return res.status(404).json({ message: "photo not found" });
    }
    helpers.deleteFile(user.photo);
    user.photo = undefined;
    await user.save();

    return res.json({ message: "user photo deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

const validations = {
  postUser,
  patchUser,
  getUser,
  putUserPhoto,
  deleteUserPhoto,
};

module.exports = validations;
