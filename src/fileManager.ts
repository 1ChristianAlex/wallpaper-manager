import { PathLike, existsSync } from 'fs';
import {
  readFile,
  writeFile,
  unlink,
  rename,
  readdir,
  lstat,
} from 'fs/promises';
import { resolve, dirname, join } from 'path';

class FileManager {
  async read(path: PathLike) {
    return readFile(path);
  }

  async white(fileName: string, fileData: string | NodeJS.ArrayBufferView) {
    const pathDistFiles = resolve(__dirname, fileName);
    return writeFile(pathDistFiles, fileData);
  }

  async deleteFile(pathFileExclud: string) {
    unlink(pathFileExclud);
  }

  async rename(oldPathName: string, newName: string) {
    const pathName = dirname(oldPathName);
    rename(oldPathName, resolve(pathName, newName));
  }

  async getPathsFromDir(pathDir: string): Promise<string[]> {
    console.log(pathDir);

    const pathResolved = resolve(pathDir);

    if (!existsSync(pathResolved)) {
      throw new Error('Dir do not exists.');
    }
    const pathList = await readdir(pathResolved);

    const resolvedPathList = pathList.map(async (pathItem) => {
      const newPath = join(pathResolved, pathItem);
      const stats = await lstat(newPath);

      if (stats.isFile()) {
        return newPath;
      }

      return this.getPathsFromDir(newPath);
    });

    return (await Promise.all(resolvedPathList)).flat();
  }
}

export default FileManager;
