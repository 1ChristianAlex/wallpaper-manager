import { Stats } from 'fs';

class FileComparer {
  isFileEqual(filesItem: Stats, fileToCompare: Stats) {
    return (
      filesItem.dev === fileToCompare.dev &&
      filesItem.mode === fileToCompare.mode &&
      filesItem.nlink === fileToCompare.nlink &&
      filesItem.uid === fileToCompare.uid &&
      filesItem.gid === fileToCompare.gid &&
      filesItem.rdev === fileToCompare.rdev &&
      filesItem.blksize === fileToCompare.blksize &&
      filesItem.size === fileToCompare.size &&
      filesItem.blocks === fileToCompare.blocks
    );
  }
}

export default FileComparer;
