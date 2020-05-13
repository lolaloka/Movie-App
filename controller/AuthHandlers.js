const { User, validator } = require("./../models/User.model");

module.exports = {
  signup: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        displayName,
      } = req.body;

      let user = await new User({ username, email, password, displayName });
      console.log(user);
      user = await user.save();
      console.log(user);
      if (!user) return res.status(400).send(" No user to Save  ");
      res.status(201).send(user);
      // res.send(user);
    } catch (exe) {
      console.log(exe);
    }
  },
};
