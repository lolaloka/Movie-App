const { Customer, validate } = require('../models/customer.model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  const customer = await Customer.find().sort('name')
  res.send(customer)
})
// Get specific genre
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (!customer) { return res.status(404).send('The Genre with The Given Id Is not Found') }
  res.send(customer)
})

// Create New genres
router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) {
    res.status(404).send(error.details[0].message)
  }
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  })
  customer = await customer.save()
  res.send(customer)
})
// Update an existing gener
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(404).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  )
  if (!customer) { return res.status(404).send('The Customer with The Given Id Is not Found') }
  res.send(customer)
})
// Delete an existing gener
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id)
  if (!customer) { return res.status(404).send(' The customer with The Given Id Is not Found') }
  res.send(customer)
})

module.exports = router
