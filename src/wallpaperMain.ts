import { copyFile, stat } from 'fs/promises';
import { join, resolve, basename, extname } from 'path';
import FileComparer from './fileComparer';
import FileManager from './fileManager';

import { v4 as uuidv4 } from 'uuid';

class WallpaperMain {
  constructor(
    private fileComparer: FileComparer,
    private fileManager: FileManager
  ) {}

  async main() {
    const filePaths = await this.fileManager.getPathsFromDir(
      'E://Wallpapers'
      // resolve(join(__dirname, '../', '/wallpapers'))
    );

    const process = filePaths
      .map(async (currentWallpaper) => {
        console.log('Iniciando leitura do arquivo');

        const currentStats = await stat(currentWallpaper);

        const keysToRemove: number[] = [];

        filePaths.forEach(async (item, indexPath) => {
          const isEqual = this.fileComparer.isFileEqual(
            currentStats,
            await stat(item)
          );
          if (isEqual) {
            keysToRemove.push(indexPath);
          }
          return isEqual;
        });

        if (keysToRemove.length > 1) {
          console.log('Removendo arquivos iguais');

          keysToRemove.forEach((item) => {
            filePaths.splice(item, 1);
          });
        }

        return currentWallpaper;
      })
      .map(async (item) => {
        console.log('Iniciando copia do arquivo');
        const itemAwaited = await item;
        if (itemAwaited) {
          await copyFile(
            itemAwaited,
            resolve(
              join(
                __dirname,
                '../',
                '/dist-files',
                `${uuidv4()}${extname(itemAwaited)}`
              )
            )
          );

          console.log('Finalizando copia do arquivo');
        }

        return;
      });

    console.log('Realizando processamento');

    await Promise.all(process);

    console.log('Finalizando processamento');
  }
}

export default WallpaperMain;
