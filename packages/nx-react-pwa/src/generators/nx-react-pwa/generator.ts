import {
  formatFiles,
  getWorkspaceLayout,
  installPackagesTask,
  Tree,
} from '@nrwl/devkit';
import { NormalizedSchema, ReactPwaGeneratorSchema } from './schema';
import { copyFolder, insertImportToMainTs } from './utils/fs.utils';
import { updatePackageJson, updateProjectJson } from './utils/json.utils';
import { updateIndexHtml } from './utils/ast.utils';

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

  const indexHtmlFilePath = `apps/${options.project}/src/index.html`;
  updateIndexHtml(indexHtmlFilePath);
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
