import {
  formatFiles,
  getWorkspaceLayout,
  installPackagesTask,
  Tree,
} from '@nrwl/devkit';
import { readFileIfExisting } from '@nrwl/workspace/src/core/file-utils';
import { NormalizedSchema, ReactPwaGeneratorSchema } from './schema';
import { copyFolder, insertImportToMainTs } from './utils/fs.utils';
import { updatePackageJson, updateProjectJson } from './utils/json.utils';

function normalizeOptions(
  tree: Tree,
  options: ReactPwaGeneratorSchema
): NormalizedSchema {
  const { appsDir } = getWorkspaceLayout(tree);
  const projectRoot = `${appsDir}/${options.project}`;

  return {
    ...options,
    projectRoot,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const { appsDir } = getWorkspaceLayout(tree);
  const projectRoot = `${appsDir}/${options.project}`;

  copyFolder(projectRoot);
  insertImportToMainTs(projectRoot);

  // TODO: Update index.html
  const indexHTML = readFileIfExisting(
    `apps/${options.project}/src/index.html`
  );
}

export default async function (tree: Tree, options: ReactPwaGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  updatePackageJson(tree);
  updateProjectJson(tree, options);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
