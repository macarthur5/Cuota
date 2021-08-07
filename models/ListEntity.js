class ListEntity {
  static create(fileName, path, stat) {
    return {
      name: fileName,
      path: path,
      isFile: stat.isFile(),
    };
  }
}

module.exports = ListEntity;
