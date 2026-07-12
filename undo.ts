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

    // t({t("Supervision Globale", "Global Supervision")}, "Global Supervision") -> t("Supervision Globale", "Global Supervision")
    let newContent = content.replace(/t\(\{t\("([^"]+)", "([^"]+)"\)\}, "([^"]+)"\)/g, 't("$1", "$2")');
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
    
    // t({t("Alerte Pièces (Magasin)", "Parts Alert (Store)")}, "Parts Alert (Store)")
    newContent = content.replace(/t\(\{t\("([^"]+)", "([^"]+)"\)\}, "([^"]+)"\)/g, 't("$1", "$2")');
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
    
    // t({t("Normal", "Normal")}, {t("Normal", "Normal")}) -> t("Normal", "Normal")
    newContent = content.replace(/t\(\{t\("([^"]+)", "([^"]+)"\)\}, \{t\("([^"]+)", "([^"]+)"\)\}\)/g, 't("$1", "$2")');
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
    
    // {t({t("...
    newContent = content.replace(/\{t\(\{t\("([^"]+)", "([^"]+)"\)\}, "([^"]+)"\)\}/g, 't("$1", "$2")');
    if (newContent !== content) {
      content = newContent;
      changed = true;
    }
    
    // {activeAlarms > 0 ? activeAlarms : t({t("Normal", "Normal")}, {t("Normal", "Normal")})} -> t("Normal", "Normal")
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  }
});
