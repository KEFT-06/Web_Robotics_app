import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const viewsDir = path.join(process.cwd(), 'src/views');

walkDir(viewsDir, (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // specifically replace "p-8 " with "p-4 md:p-8 "
    content = content.replace(/className="p-8/g, 'className="p-4 md:p-8');
    // Also change `p-8` that are followed by something else like ` p-8 `
    content = content.replace(/ p-8 /g, ' p-4 md:p-8 ');

    // For glass panels, maybe they had padding 8
    
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log("Updated padding in views for mobile responsiveness.");
