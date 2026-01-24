const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Tạo thư mục ssl nếu chưa có
const backendSslDir = path.join(__dirname, 'backend', 'ssl');
const frontendSslDir = path.join(__dirname, 'frontend', 'ssl');

if (!fs.existsSync(backendSslDir)) {
     fs.mkdirSync(backendSslDir, { recursive: true });
}

if (!fs.existsSync(frontendSslDir)) {
     fs.mkdirSync(frontendSslDir, { recursive: true });
}

console.log('Installing selfsigned package...');
try {
     execSync('npm install --save-dev selfsigned', { stdio: 'inherit' });
} catch (error) {
     console.error('Error installing selfsigned package');
     process.exit(1);
}

const selfsigned = require('selfsigned');

console.log('\n=== Generating SSL Certificates ===\n');

const attrs = [
     { name: 'commonName', value: 'localhost' },
     { name: 'countryName', value: 'VN' },
     { shortName: 'ST', value: 'HoChiMinh' },
     { name: 'localityName', value: 'HoChiMinh' },
     { name: 'organizationName', value: 'MovieBooking' },
     { shortName: 'OU', value: 'Dev' }
];

const options = {
     keySize: 2048,
     days: 365,
     algorithm: 'sha256'
};

console.log('Generating certificates...');

(async () => {
     const pems = await selfsigned.generate(attrs, options);

     console.log('Generated keys successfully!');

     // Lưu certificates cho backend
     console.log('Saving backend certificates...');
     fs.writeFileSync(path.join(backendSslDir, 'key.pem'), pems.private);
     fs.writeFileSync(path.join(backendSslDir, 'cert.pem'), pems.cert);

     // Lưu certificates cho frontend
     console.log('Saving frontend certificates...');
     fs.writeFileSync(path.join(frontendSslDir, 'key.pem'), pems.private);
     fs.writeFileSync(path.join(frontendSslDir, 'cert.pem'), pems.cert);

     // Tạo .gitignore files
     const gitignoreContent = `*.pem
*.key
*.crt
`;

     fs.writeFileSync(path.join(backendSslDir, '.gitignore'), gitignoreContent);
     fs.writeFileSync(path.join(frontendSslDir, '.gitignore'), gitignoreContent);

     console.log('\n✅ SSL Certificates generated successfully!');
     console.log('\nBackend certificates:');
     console.log(`  - ${path.join(backendSslDir, 'key.pem')} `);
     console.log(`  - ${path.join(backendSslDir, 'cert.pem')} `);
     console.log('\nFrontend certificates:');
     console.log(`  - ${path.join(frontendSslDir, 'key.pem')} `);
     console.log(`  - ${path.join(frontendSslDir, 'cert.pem')} `);
     console.log('\n📝 Next steps:');
     console.log('1. Update backend/server.js to use HTTPS');
     console.log('2. Update frontend/vite.config.js to use HTTPS');
     console.log('3. Update docker-compose.yaml URLs to use https://');
     console.log('4. Run your application and accept the self-signed certificate in browser');
})();
