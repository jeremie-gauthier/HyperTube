import path from "path";

module.exports = {
  process(_: unknown, filename: string) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
