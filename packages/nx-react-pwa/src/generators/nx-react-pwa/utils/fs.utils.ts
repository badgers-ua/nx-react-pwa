export const copyFolder = (projectRoot: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reflect = require('@alumna/reflect');

  reflect({
    src: 'node_modules/@bdgr/nx-react-pwa/src/generators/nx-react-pwa/files/src/',
    dest: `${projectRoot}/src`,
    recursive: true,
    delete: false,
  });
};
