const Location = require('../models/LocationModel');

// @desc    Add new location
// @route   POST /api/locations
exports.addLocation = async (req, res) => {
  const { userId, locationName, latitude, longitude, radius, delay } = req.body;

//   if (!name || !latitude || !longitude || !radius || !delay) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

if (!userId || !locationName || latitude == null || longitude == null || radius == null || !delay) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const location = new Location({ userId, locationName, latitude, longitude, radius, delay });
    await location.save();
    res.status(200).json({ message: 'Location saved successfully', location });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find().sort({ createdAt: -1 });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error: error.message });
  }
};

exports.deleteLocation = async (req, res) => {
    const { id } = req.params;
  
    try {
      const location = await Location.findByIdAndDelete(id);
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
      res.status(200).json({ message: 'Location deleted', id });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting location', error: error.message });
    }
  };

exports.getLocationById = async (req, res) => {
    const { id } = req.params;

    try {
        const location = await Location.findById(id);
        if (!location) {
        return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching location', error: error.message });
    }
};

exports.getLocationByName = async (req, res) => {
  const { name } = req.params;

  try {
    const location = await Location.findOne({ locationName: name });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching location', error: error.message });
  }
};