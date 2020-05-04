module.exports = {
  getListCustomers: async (req, res) => {
    try {
      const customer = await Customer.find().sort("name");
      if (!customer || customer.length === 0)
        res.status(204).send("there is no content ");
      res.send(customer);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getSpecificCustomer: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer)
        return res.status(404).send("The Genre with The Given Id Is not Found");
      res.send(customer);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createNewCustomer: async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      res.status(404).send(error.details[0].message);
    }
    let customer = new Customer({
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    });
    customer = await customer.save();
    res.send(customer);
  },
  updateCustomer: async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!customer)
      return res
        .status(404)
        .send("The Customer with The Given Id Is not Found");
    res.send(customer);
  },
  deleteCustomer: async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res
        .status(404)
        .send(" The customer with The Given Id Is not Found");
    res.send(customer);
  }
};
