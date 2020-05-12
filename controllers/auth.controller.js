
const { User, userValidation } = require('./../models/user.model');

module.exports = {
  signUp: async (req, res) => {
    const { username, password, email, confirmPassword, displayName } = req.body;

    const createdUser = await new User({ username, password, email, displayName });
    await createdUser.save()
    res.json(createdUser).status(201);

    // res.send you can send any thing such as [files, sitrng, json ... etc]
    // res.json only retreives a json object.
  }
};
