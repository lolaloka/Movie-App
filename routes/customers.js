const { Customer, validate } = require("../models/customer.model");
const express = require("express");
const router = express.Router();
const customerHandlers = require("../models/customerHandlebars");
router.get("/", customerHandlers.getListCustomers);
// Get specific genre
router.get("/:id", customerHandlers.getSpecificCustomer);

// Create New genres
router.post("/", customerHandlers.createNewCustomer);
// Update an existing gener
router.put("/:id", customerHandlers.updateCustomer);
// Delete an existing gener
router.delete("/:id", customerHandlers.deleteCustomer);

module.exports = router;
