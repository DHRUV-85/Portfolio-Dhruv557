// Simple logger implementation that won't cause crashes
const logger = {
    info: (message) => {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    },
    error: (message, error = null) => {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
      if (error) {
        console.error(error.stack || error);
      }
    }
  };
  
  module.exports = logger;