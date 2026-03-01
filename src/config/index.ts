export const SECRET = 'EAAFCE8ECC522E391DEC31D8F5C54';
// export const MONGO_DB = 'mongodb://mongo:27017/db';
// export const MONGO_DB_NAME = 'db';
export const MONGO_DB = 'mongodb://localhost:27017/portfolio';
export const MONGO_DB_NAME = 'portfolio';

// testnewsitedebug.com
// sudo nano /etc/nginx/sites-available/testnewsitedebug.com

// server {
//   listen 80;
//   server_name testnewsitedebug.com www.testnewsitedebug.com;
//     location / {
//       proxy_pass http://localhost:27182;
//       proxy_http_version 1.1;
//       proxy_set_header Upgrade $http_upgrade;
//       proxy_set_header Connection 'upgrade';
//       proxy_set_header Host $host;
//       proxy_cache_bypass $http_upgrade;
//     }
// }

// sudo ln -s /etc/nginx/sites-available/testnewsitedebug.com /etc/nginx/sites-enabled/
// sudo unlink /etc/nginx/sites-enabled/default

// pm2 start dist/main.js --name "testnewsitedebug.com"
// sudo certbot --nginx -d testnewsitedebug.com -d www.testnewsitedebug.com