import Resizer from "react-image-file-resizer";

export function resizeFile(file: File): Promise<File> {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      700,
      700,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
}
