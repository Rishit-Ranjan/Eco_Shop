import fs from 'node:fs';
import path from 'node:path';
function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const replacements = [
        { target: /text-indigo-600/g, replacement: 'text-sage-leaf' },
        { target: /bg-indigo-600/g, replacement: 'bg-sage-leaf' },
        { target: /hover:bg-indigo-700/g, replacement: 'hover:bg-sage-leaf-hover' },
        { target: /bg-indigo-700/g, replacement: 'bg-sage-leaf-hover' },
        { target: /text-indigo-700/g, replacement: 'text-sage-leaf-hover' },
        { target: /text-indigo-800/g, replacement: 'text-sage-dark' },
        { target: /hover:text-indigo-600/g, replacement: 'hover:text-sage-leaf' },
        { target: /hover:text-indigo-800/g, replacement: 'hover:text-sage-leaf-hover' },
        { target: /focus:ring-indigo-600/g, replacement: 'focus:ring-sage-leaf' },
        { target: /focus:border-indigo-500/g, replacement: 'focus:border-sage-leaf' },
        { target: /bg-indigo-50/g, replacement: 'bg-sage-leaf/10' },
        { target: /text-indigo-200/g, replacement: 'text-natural-bg/80' },
        { target: /bg-indigo-900/g, replacement: 'bg-sage-dark' },
        { target: /shadow-indigo-200/g, replacement: 'shadow-[0_10px_30px_-15px_rgba(113,125,107,0.3)]' },
        { target: /shadow-indigo-100/g, replacement: 'shadow-[0_10px_30px_-15px_rgba(113,125,107,0.2)]' },
        { target: /text-gray-900/g, replacement: 'text-sage-dark' },
        { target: /bg-gray-50/g, replacement: 'bg-[#F7F6F2]' },
        { target: /border-gray-100/g, replacement: 'border-natural-border' },
        { target: /border-gray-200/g, replacement: 'border-natural-border' },
        { target: /border-gray-300/g, replacement: 'border-natural-border' },
        { target: /text-gray-500/g, replacement: 'text-natural-text/70' },
        { target: /text-gray-600/g, replacement: 'text-natural-text/80' },
        { target: /shadow-sm/g, replacement: 'soft-shadow' },
        { target: /shadow-md/g, replacement: 'soft-shadow' },
        { target: /shadow-lg/g, replacement: 'soft-shadow' },
        { target: /font-extrabold/g, replacement: 'font-serif font-semibold' },
        { target: /font-bold/g, replacement: 'font-serif font-semibold' },
        { target: /bg-gray-100/g, replacement: 'bg-natural-stone' },
        { target: /text-gray-700/g, replacement: 'text-sage-dark/80' },
        { target: /bg-white/g, replacement: 'bg-[#FCFCFA]' },
        { target: /rounded-xl/g, replacement: 'rounded-[32px]' },
        { target: /rounded-2xl/g, replacement: 'rounded-[40px]' },
    ];
    replacements.forEach(({ target, replacement }) => {
        content = content.replace(target, replacement);
    });
    fs.writeFileSync(filePath, content, 'utf-8');
}
function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDir(fullPath);
        }
        else if (fullPath.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    });
}
traverseDir(path.join(process.cwd(), 'src'));
console.log('Theme applied successfully.');
