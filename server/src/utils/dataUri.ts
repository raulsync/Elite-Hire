import DataUriParser from "datauri/parser.js";
import path from "path";

export const getDataUri = (file: Express.Multer.File) => {
  console.log(file);
  if (!file) {
    throw new Error("File is required to generate Data URI.");
  }
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
