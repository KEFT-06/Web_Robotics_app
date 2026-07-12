import fs from 'fs';
import path from 'path';

const mapping = {
  '#8B7FFF': '#10B981', 
  '#F4D03F': '#06B6D4', 
  '#E8E6FF': '#ECFDF5', 
  'Sparte RobotiX': 'Sparte Robotics'
};

function processDir(dir) {
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      processDir(p);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css')) {
      let content = fs.readFileSync(p, 'utf8');
      let changed = false;
      for (const [k, v] of Object.entries(mapping)) {
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
