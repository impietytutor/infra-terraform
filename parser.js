const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePaths) {
    this.filePaths = filePaths;
  }

  async parseFiles() {
    const parsedData = [];
    for (const filePath of this.filePaths) {
      try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        parsedData.push(jsonData);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(`File not found: ${filePath}`);
        } else if (error instanceof SyntaxError) {
          console.error(`Invalid JSON in file: ${filePath}`);
        } else {
          console.error(`Error parsing file: ${filePath}`, error);
        }
      }
    }
    return parsedData;
  }

  async validateFiles() {
    for (const filePath of this.filePaths) {
      try {
        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);
        if (!this.isValidJson(jsonData)) {
          console.error(`Invalid JSON structure in file: ${filePath}`);
        }
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.error(`File not found: ${filePath}`);
        } else if (error instanceof SyntaxError) {
          console.error(`Invalid JSON in file: ${filePath}`);
        } else {
          console.error(`Error validating file: ${filePath}`, error);
        }
      }
    }
  }

  isValidJson(data) {
    if (typeof data !== 'object' || Array.isArray(data)) {
      return false;
    }
    for (const key in data) {
      if (typeof key !== 'string') {
        return false;
      }
      if (typeof data[key] !== 'string' && typeof data[key] !== 'number' && typeof data[key] !== 'boolean' && typeof data[key] !== 'object') {
        return false;
      }
    }
    return true;
  }
}

module.exports = Parser;