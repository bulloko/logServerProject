const fs = require('fs');
const path = require('path');

// Get the target file size (in MB) and log file name from command-line arguments
const targetSizeMB = process.argv[2];
const logFileName = process.argv[3] || 'large_sample_log_file.log'; // Default file name if not provided

if (!targetSizeMB || isNaN(targetSizeMB) || targetSizeMB <= 0) {
    console.error('Please provide a valid size in MB (e.g., node generateLargeLogFile.js 100 log_file_name.log)');
    process.exit(1);
}

// Convert MB to bytes
const targetSize = targetSizeMB * 1024 * 1024; // Convert MB to bytes
let currentSize = 0;

// Path to the log file (in the `var/log` directory)
const logFilePath = path.join(__dirname, 'var', 'log', logFileName);

// Create the log file and write to it
const stream = fs.createWriteStream(logFilePath, { flags: 'a', encoding: 'utf8' });

// Generate log data until the file reaches the target size
while (currentSize < targetSize) {
    const timestamp = new Date().toISOString();
    const logLevel = ['INFO', 'ERROR', 'WARNING'][Math.floor(Math.random() * 3)];
    const userId = Math.floor(Math.random() * 1000);
    const message = `Random log entry for user${userId}. Current time: ${timestamp}`;
    
    // Construct the log entry
    const logEntry = `${timestamp} ${logLevel} ${message}\n`;

    // Write the log entry to the file
    stream.write(logEntry);

    // Update current size
    currentSize += Buffer.byteLength(logEntry, 'utf8');
}

stream.end(() => {
    console.log(`Log file generation complete! The file is ${targetSizeMB}MB and saved as "${logFileName}".`);
});
