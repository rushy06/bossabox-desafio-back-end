const User = require('../models/User')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async update (req, res) {
    const { id } = req.params

    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true
      })
      if (user) {
        return res.json({ user })
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      return res.status(400).json({ error: 'Failed to update user' })
    }
  }

  async show (req, res) {
    const { id } = req.params

    try {
      const user = await User.findById(id)
      if (user) {
        return res.json({ user })
      } else {
        return res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      return res.status(400).json({ error: 'Error fetching user' })
    }
  }

  async destroy (email) {
    await User.deleteMany({ email })
  }
}

module.exports = new UserController()
