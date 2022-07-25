/* eslint-disable @typescript-eslint/no-var-requires */
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

export const createWorkBoxConfigJs = (projectRoot: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');

  const config = `module.exports = {
      globDirectory: "dist/apps/${projectRoot}",
      globPatterns: ['**/*.{txt,ico,html,js}'],
      swDest: "dist/apps/${projectRoot}/service-worker.js",
    };`;

  const prettier = require('prettier');
  const formattedConfig: string = prettier.format(config, {
    parser: 'typescript',
  });

  fs.writeFileSync(`./apps/${projectRoot}/workbox-config.js`, formattedConfig);
};
