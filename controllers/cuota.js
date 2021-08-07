const fs = require("fs").promises;
const homedir = require("os").homedir();
const path = require("path");
const ListEntity = require("../models/ListEntity");

class CuotaController {
  static async createList(directory) {
    try {
      const files = await fs.readdir(directory);

      if (!files) {
        throw "Files object is null";
      }

      const list = [];

      for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        const fullPath = path.join(directory, file);
        const stat = await fs.lstat(decodeURIComponent(fullPath));

        list.push(ListEntity.create(file, fullPath, stat));
      }

      return list;
    } catch (err) {
      throw err;
    }
  }

  static async serve(request, response) {
    const pathRelativeToHome = request.path;
    const pathRelativeToSystem = path.join(homedir, pathRelativeToHome);

    const decodedPathRelativeToHome = decodeURIComponent(pathRelativeToHome);
    const decodedPathRelativeToSystem =
      decodeURIComponent(pathRelativeToSystem);

    try {
      const stats = await fs.lstat(decodedPathRelativeToSystem);
      const isFile = stats.isFile();

      if (isFile) {
        if(request.query.download==="true"){
          response.download(decodedPathRelativeToSystem);
        }else{
          response.redirect(decodedPathRelativeToHome);
        }
      } else {
        try {
          const list = await CuotaController.createList(decodedPathRelativeToSystem);
          response.send({ status: "OK", list });
        } catch (err) {
          response.send({ status: "FAIL", error: err });
        }
      }
    } catch (err) {
      response.send({ status: "FAIL", error: err });
    }
  }
}

module.exports = CuotaController;
