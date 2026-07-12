import fs from 'fs';
import path from 'path';

function processDir(dir) {
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      let content = fs.readFileSync(p, 'utf8');
      
      const replacements = {
        'text-[#ECFDF5]': 'text-text-main',
        'text-black': 'text-luxury-bg-start',
        'bg-white': 'bg-text-main'
      };

      let changed = false;
      for (const [k, v] of Object.entries(replacements)) {
        if (content.includes(k)) {
          content = content.split(k).join(v);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(p, content);
        console.log(`Updated ${p}`);
      }
    }
  });
}

processDir('./src');
