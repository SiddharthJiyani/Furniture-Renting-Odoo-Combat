// middleware/validateDateFormat.js

const validateDateFormat = (req, res, next) => {
    const { startDate, endDate } = req.body;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Missing startDate or endDate in request body.' });
    }
  
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (!startDate.match(dateFormatRegex) || !endDate.match(dateFormatRegex)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD format.' });
    }
  
    next();
  };
  
  module.exports = validateDateFormat;
  