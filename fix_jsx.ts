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
    let changed = false;

    if (content.includes('? {t(')) {
      content = content.replace(/\? \{t\(/g, '? t(');
      changed = true;
    }
    if (content.includes(') : {t(')) {
      content = content.replace(/\) : \{t\(/g, ') : t(');
      changed = true;
    }
    if (content.includes('"} : {t(')) {
      content = content.replace(/"\} : \{t\(/g, '"} : t(');
      changed = true;
    }
    if (content.includes('"(Store)")} : {t(')) {
      content = content.replace(/\(Store\)"\)\} : \{t\(/g, '(Store)")} : t(');
      changed = true;
    }
    // Any `? {t("something", "something")} : {t("something", "something")}`
    content = content.replace(/\? \{t\(([^)]+)\)\}\s*:\s*\{t\(([^)]+)\)\}/g, '? t($1) : t($2)');

    // For {activeAlarms > 0 ? activeAlarms : {t("Normal", "Normal")}}
    content = content.replace(/: \{t\(([^)]+)\)\}/g, ': t($1)');
    content = content.replace(/\? activeAlarms\s*:\s*\{t\(([^)]+)\)\}/g, '? activeAlarms : t($1)');

    if (content.includes('": {t(')) {
         content = content.replace(/": \{t\("([^"]+)", "([^"]+)"\)\}/g, '": t("$1", "$2")');
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
