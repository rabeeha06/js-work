
const os = require('os');
const path = require('path');
const fs = require('fs');

// ==========================================
// TASK 1: System Hardware Diagnostics
// ==========================================

const platform = os.platform();
const release = os.release();

const totalMemoryGB = (
    os.totalmem() / (1024 ** 3)
).toFixed(2);

const freeMemoryGB = (
    os.freemem() / (1024 ** 3)
).toFixed(2);

const logicalCPUs = os.cpus().length;
const homeDirectory = os.homedir();

console.log('\n===== SYSTEM HARDWARE DIAGNOSTICS =====\n');

console.table([
    {
        'Platform': platform,
        'OS Release': release,
        'Total Memory (GB)': totalMemoryGB,
        'Free Memory (GB)': freeMemoryGB,
        'Logical CPU Cores': logicalCPUs,
        'Home Directory': homeDirectory
    }
]);

// ==========================================
// TASK 2: Safe Path Normalization
// ==========================================

const targetPath = path.join(
    'system_reports',
    'daily_logs',
    'report.txt'
);

const absolutePath = path.resolve(targetPath);
const directoryName = path.dirname(absolutePath);
const fileExtension = path.extname(absolutePath);

console.log('\n===== PATH DETAILS =====\n');

console.log('Full Absolute Path:', absolutePath);
console.log('Directory Name:', directoryName);
console.log('File Extension:', fileExtension);

// ==========================================
// TASK 3: Directory and File Management
// ==========================================

const reportDirectory = path.dirname(absolutePath);

// Create directory structure recursively
if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory, { recursive: true });
    console.log('\nDirectory created successfully.');
} else {
    console.log('\nDirectory already exists.');
}

// Create formatted system metrics report
const timestamp = new Date().toISOString();

const reportContent = `
===== SYSTEM AUDIT REPORT =====
Timestamp: ${timestamp}

Platform: ${platform}
OS Release: ${release}
Total Memory: ${totalMemoryGB} GB
Free Memory: ${freeMemoryGB} GB
Logical CPU Cores: ${logicalCPUs}
Home Directory: ${homeDirectory}
`;

// Write initial report
fs.writeFileSync(absolutePath, reportContent, 'utf-8');

// Append audit completion line
fs.appendFileSync(
    absolutePath,
    '\nAudit operation completed by Fathima Rabeeha M.\n',
    'utf-8'
);

// Read complete report
const finalContents = fs.readFileSync(
    absolutePath,
    'utf-8'
);

// Display final contents
console.log('\n===== REPORT PERSISTENCE CONFIRMED =====\n');
console.log(finalContents);

console.log('Report saved successfully at:');
console.log(absolutePath);
