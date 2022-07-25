import { Tree, updateJson } from '@nrwl/devkit';
import { ReactPwaGeneratorSchema } from '../schema';

export const updatePackageJson = (tree: Tree) => {
  updateJson(tree, 'package.json', (pkgJson) => {
    pkgJson.scripts = pkgJson.scripts ?? {};
    pkgJson.scripts.postbuild = 'npx workbox-cli generateSW workbox-config.js';
    pkgJson.devDependencies['workbox-cli'] = '^6.5.3';
    return pkgJson;
  });
};

export const updateProjectJson = (
  tree: Tree,
  options: ReactPwaGeneratorSchema
) => {
  updateJson(tree, `apps/${options.project}/project.json`, (projectJson) => {
    projectJson.targets.build.options.assets = [
      ...projectJson.targets.build.options.assets,
      `apps/${options.project}/src/robots.txt`,
      `apps/${options.project}/src/manifest.json`,
    ];
    return projectJson;
  });
};
