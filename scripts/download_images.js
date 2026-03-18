import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';

const srcDir = path.join(process.cwd(), 'src');
const assetsDir = path.join(process.cwd(), 'public', 'assets', 'img');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function fetchImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchImage(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (fullPath.endsWith('.jsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function run() {
  const files = getFiles(srcDir);
  let totalDownloaded = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /(['"])(https:\/\/(images\.unsplash\.com|images\.kiwi\.com\/(?!airlines))[^'"]+)\1/g;
    const matchesArray = Array.from(content.matchAll(regex));
    
    if (matchesArray.length > 0) {
      let modifiedContent = content;
      
      for (const matchArr of matchesArray) {
        const url = matchArr[2];
        const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 10);
        const fileName = `img_${hash}.jpg`;
        const destPath = path.join(assetsDir, fileName);
        const relativeUrl = `/assets/img/${fileName}`;

        if (!fs.existsSync(destPath)) {
          console.log(`Downloading ${url} -> ${fileName}`);
          try {
            await fetchImage(url, destPath);
            totalDownloaded++;
          } catch(err) {
            console.error(err.message);
            continue;
          }
        }
        
        modifiedContent = modifiedContent.replace(url, relativeUrl);
      }
      
      if (content !== modifiedContent) {
        fs.writeFileSync(file, modifiedContent, 'utf8');
        console.log(`Updated file: ${path.relative(process.cwd(), file)}`);
      }
    }
  }
  
  // also download airline logos manually
  const airlines = ["AI", "6E", "UK", "SG", "QP", "I5", "9I"];
  for (const code of airlines) {
      const url = `https://images.kiwi.com/airlines/64x64/${code}.png`;
      const fileName = `${code}.png`;
      const destPath = path.join(assetsDir, fileName);
      if (!fs.existsSync(destPath)) {
          console.log(`Downloading airline logo ${code}.png`);
          try {
              await fetchImage(url, destPath);
          } catch(e) {}
      }
  }

  // Rewrite FlightCard and FareModal dynamically loading airline images
  const flightCard = path.join(srcDir, 'pages', 'flight', 'FlightCard.jsx');
  if (fs.existsSync(flightCard)) {
      let fcContent = fs.readFileSync(flightCard, 'utf8');
      fcContent = fcContent.replace('`https://images.kiwi.com/airlines/64x64/${code}.png`', '`/assets/img/${code}.png`');
      fs.writeFileSync(flightCard, fcContent);
  }

  const fareModal = path.join(srcDir, 'pages', 'flight', 'FareModal.jsx');
  if (fs.existsSync(fareModal)) {
      let fmContent = fs.readFileSync(fareModal, 'utf8');
      fmContent = fmContent.replace('`https://images.kiwi.com/airlines/64x64/${code}.png`', '`/assets/img/${code}.png`');
      fs.writeFileSync(fareModal, fmContent);
  }

  console.log(`Finished processing. Total new downloads: ${totalDownloaded}`);
}

run().catch(console.error);
