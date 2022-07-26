import { Tree, updateJson } from '@nrwl/devkit';
import { ReactPwaGeneratorSchema } from '../schema';

export const updatePackageJson = (tree: Tree) => {
  updateJson(tree, 'package.json', (pkgJson) => {
    pkgJson.scripts = pkgJson.scripts ?? {};
    pkgJson.devDependencies['workbox-cli'] = '^6.5.3';
    return pkgJson;
  });
};

export const updateProjectJson = (
  tree: Tree,
  options: ReactPwaGeneratorSchema
) => {
  updateJson(tree, `apps/${options.project}/project.json`, (projectJson) => {
    projectJson.targets['pre-build'] = { ...projectJson.targets.build };

    projectJson.targets['pre-build'].options.assets = [
      ...projectJson.targets.build.options.assets,
      `apps/${options.project}/src/robots.txt`,
      `apps/${options.project}/src/manifest.json`,
    ];

    projectJson.targets.serve.configurations.development = {
      ...projectJson.targets.serve.configurations.development,
      buildTarget: `${options.project}:pre-build:development`,
    };

    projectJson.targets.serve.configurations.production = {
      ...projectJson.targets.serve.configurations.development,
      buildTarget: `${options.project}:pre-build:production`,
    };

    projectJson.targets.serve.options = {
      ...projectJson.targets.serve.options,
      buildTarget: `${options.project}:pre-build`,
    };

    projectJson.targets.build = {
      executor: 'nx:run-commands',
      dependsOn: ['pre-build'],
      options: {
        commands: [
          `npx workbox-cli generateSW ./apps/${options.project}/workbox-config.js`,
        ],
        parallel: false,
      },
    };

    return projectJson;
  });
};
