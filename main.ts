import FileComparer from './src/fileComparer';
import FileManager from './src/fileManager';
import WallpaperMain from './src/wallpaperMain';

const main = () => {
  const wallpaperMain = new WallpaperMain(
    new FileComparer(),
    new FileManager()
  );

  wallpaperMain.main();
};

main();
