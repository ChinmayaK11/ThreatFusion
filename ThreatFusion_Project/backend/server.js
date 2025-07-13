const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
require('./scheduler/emailScheduler'); // Import the scheduler



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});