const db = require('../../core/database.js').db;
const getTranslation = async () => {
    try {
    const [translations] = await db.query('SELECT * FROM translations ORDER BY timestamp DESC');
    res.json({ translations });
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
    getTranslation
};
