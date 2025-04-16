const User = require('../models/UserModel');

// Login
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || user.password !== password) {
//         return res.status(401).json({ message: "Invalid credentials" });
//     }

//     res.status(200).json({ message: "Login successful" });
//     name: user.name
// };

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
   
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Login error", error: error.message });
    }
  };
  



// Register
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
};
