
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

export async function runCode(code: string): Promise<string> {
  const id = uuidv4();
  const folderPath = path.join(__dirname, 'temp', id);
  const codePath = path.join(folderPath, 'main.cpp');

  await fs.mkdir(folderPath, { recursive: true });
  await fs.writeFile(codePath, code);

  const isWindows = os.platform() === 'win32';
  const dockerVolumePath = isWindows
    ? folderPath.replace(/\\/g, '/')  
    : folderPath;

  const dockerCommand = isWindows
    ? `docker run --rm -v "${dockerVolumePath}:/app" -w /app gcc:latest bash -c "g++ main.cpp -o main.out && ./main.out"`
    : `docker run --rm -v ${dockerVolumePath}:/app -w /app gcc:latest sh -c "g++ main.cpp -o main.out && ./main.out"`;

  return new Promise((resolve, reject) => {
    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Docker execution error:", stderr || error.message);
        return reject(stderr || error.message);
      }
      resolve(stdout);
    });
  });
}
