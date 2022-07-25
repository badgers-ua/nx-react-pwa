export const copyFolder = (projectRoot: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reflect = require('@alumna/reflect');

  reflect({
    src: 'node_modules/@badgers-ua/nx-react-pwa/src/generators/nx-react-pwa/files/src/',
    dest: `${projectRoot}/src`,
    recursive: true,
    delete: false,
  });
};

export const insertImportToMainTs = (projectRoot: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');

  const mainTsxFilePath = `${projectRoot}/src/main.tsx`;

  const data = fs.readFileSync(mainTsxFilePath).toString().split('\n');
  data.splice(0, 0, "import './registerServiceWorker.js'\n");
  const text = data.join('\n');

  fs.writeFile(mainTsxFilePath, text, function (err) {
    if (err) return console.log(err);
  });
};
