const TestSite = require('../models/TestSite');

exports.addTestSite = async (req, res) => {
  try {
    const { url, name } = req.body;
    const newTestSite = new TestSite({
      user: req.user.userId,
      url,
      name,
    });
    await newTestSite.save();
    res.status(201).json(newTestSite);
  } catch (error) {
    res.status(500).json({ error: 'Error adding test site' });
  }
};

exports.getTestSites = async (req, res) => {
  try {
    const testSites = await TestSite.find({ user: req.user.userId });
    res.json(testSites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching test sites' });
  }
};

exports.deleteTestSite = async (req, res) => {
  try {
    const testSite = await TestSite.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!testSite) {
      return res.status(404).json({ error: 'Test site not found' });
    }
    res.json({ message: 'Test site deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting test site' });
  }
};