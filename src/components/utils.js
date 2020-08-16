import { route } from 'preact-router';
import { useHotkeys } from 'react-hotkeys-hook';

import firebase from './firebase';

export const HOME_PATH = '/';
export const EDIT_PATH = '/e/';

export const TREE_MAX_LEVEL = 4;
export const TREE_ROOT_NAME = 'Notes';

export const EDIT_DEBOUNCE_DURATION = 750;

export const userAlert = ({ title }) => window.alert(title);

export const userInput = ({ title, defaultValue, process, error }) => {
  let input = window.prompt(title, defaultValue);
  if (input === null) return null;

  input = (input || '').trim();
  if (process) {
    input = process(input);
  }
  if (!input && error) {
    userAlert({title: error});
  }
  return input
};

export const userConfirm = ({ title }) => window.confirm(title);

export const hashString = (input) => {
  let hash = 0;
  if (!input.length) return hash;

  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash = hash & hash;
  }
  return hash;
};

export const hashNote = (id, body) => hashString(`${id}: ${body}`);

export const useShortcut = (key, action, deps) => useHotkeys(
  key.indexOf('cmd') >= 0 ? `${key}, ${key.replace(/cmd/g, 'ctrl')}` : key,
  (e) => {
    action();
    e.preventDefault();
    return false;
  },
  {filter: () => true, keydown: false, keyup: true},
  deps
);

export const treeBuild = (tree) => {
  const treeRoot = {
    id: null,
    title: TREE_ROOT_NAME,
    isFolder: true,
    open: true,
    children: []
  };
  if (!tree) return [treeRoot];

  // Build parent-children map
  const nodeMap = {};
  tree.forEach((node) => {
    const data = node.data();
    nodeMap[data.parentId] = nodeMap[data.parentId] || [];
    nodeMap[data.parentId].push({
      ...data,
      id: node.id
    });
  });

  // Build sorted tree
  const getSortableString = (node) => `${node.isFolder ? '0' : '1'} - ${node.title}`;
  const getChildrenRecursive = (parentId) => (
    nodeMap[parentId]
      ? nodeMap[parentId]
        .map((node) => ({...node, children: node.isFolder ? getChildrenRecursive(node.id) : null}))
        .sort((a, b) => getSortableString(a).localeCompare(getSortableString(b)))
      : null
  );
  treeRoot.children = getChildrenRecursive(null);
  return [treeRoot];
};

export const treeCreateNote = async (node, user, tree) => {
  const parentId = node ? node.id : _getNewParentId(tree);
  if (parentId === undefined) return;

  const name = _getNewName(false, 'New Note');
  if (!name) return;

  const doc = await firebase.firestore().collection('tree').add({
    userId: user.uid,
    parentId,
    title: name,
    isFolder: false,
    body: ''
  });
  route(EDIT_PATH + doc.id);
};

export const treeCreateFolder = async (node, user, tree) => {
  const parentId = node ? node.id : _getNewParentId(tree);
  if (parentId === undefined) return;

  const name = _getNewName(true, 'New Folder');
  if (!name) return;

  firebase.firestore().collection('tree').add({
    userId: user.uid,
    parentId,
    title: name,
    isFolder: true
  });
};

export const treeRenameNode = async (node) => {
  if (!node) return;

  const name = _getNewName(node.isFolder, node.title);
  if (!name) return;

  firebase.firestore().collection('tree').doc(node.id).update({title: name});
};

export const treeMoveNode = async (node, tree) => {
  if (!node) return;

  const parentId = _getNewParentId(tree, node);
  if (parentId === undefined) return;
  if (parentId === node.parentId) {
    userAlert({title: 'No valid folders found!'});
    return;
  }

  firebase.firestore().collection('tree').doc(node.id).update({
    parentId
  });
};

export const treeDeleteNode = async (node, user) => {
  if (!node) return;

  if (!userConfirm({title: `Delete "${node.title}"${node.isFolder ? ' and its contents' : ''}?`})) return;

  const deleteRecursive = (docs) => {
    docs.forEach(async (doc) => {
      const id = doc.id;
      doc.ref.delete();
      const childDocs = await firebase.firestore()
        .collection('tree')
        .where('userId', '==', user.uid)
        .where('parentId', '==', id)
        .get();
      deleteRecursive(childDocs);
    });
  };
  const doc = await firebase.firestore().collection('tree').doc(node.id).get();
  deleteRecursive([doc]);
  route(HOME_PATH);
};

export const treeSearchNote = (tree, query) => {
  let result = [];
  if (!query || query.length < 2) return result;

  const lowercaseQuery = query.toLowerCase();
  tree.forEach((node) => {
    const data = node.data();
    if (data.isFolder) return;

    let score = 0;
    if (data.title.toLowerCase().indexOf(lowercaseQuery) >= 0) {
      score += 2;
    }
    if (data.body.toLowerCase().indexOf(lowercaseQuery) >= 0) {
      score += 1;
    }
    if (score > 0) {
      result.push({
        id: node.id,
        title: data.title,
        score
      });
    }
  });

  result = result.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (b.score > a.score) return 1;
    return a.title.localeCompare(b.title);
  });
  return result;
};

const _getNewName = (isFolder, defaultValue) => {
  const nodeType = isFolder ? 'folder' : 'note';
  const name = userInput({
    title: `Enter new ${nodeType} name:`,
    defaultValue,
    error: 'Entered an invalid name!'
  });
  return name;
};

const _getNewParentId = (tree, currentNode=null) => {
  const getFoldersRecursive = (nodes, level=1) => nodes
    .map(({ id, title, children }) => {
      // Exclude notes and itself
      const childFolders = children
        ? getFoldersRecursive(
          children.filter((childNode) => childNode.isFolder && childNode.id !== currentNode?.id),
          level + 1
        )
        : [];
      childFolders.splice(0, 0, {id, title, level});
      return childFolders;
    })
    .reduce((acc, folders) => acc.concat(folders), []);

  // Check if root is the only valid option
  const folders = getFoldersRecursive(treeBuild(tree));
  if (folders.length == 1) return null;

  // Get user input
  const minNumber = 1;
  const maxNumber = folders.length;
  const folderText = folders
    .map((folder, index) => {
      let result = '';
      for (let i = 1; i < folder.level; i++) {
        result += '   ';
      }
      result += ` ${index + 1} : ${folder.title}\n`;
      return result;
    })
    .reduce((acc, row) => acc + row, '');
  const number = userInput({
    title: `${folderText} Choose folder [${minNumber}-${maxNumber}]:`,
    defaultValue: '1',
    process: (input) => {
      const inputNumber = Math.floor(input);
      return isNaN(inputNumber) || inputNumber < minNumber || inputNumber > maxNumber ? null : inputNumber;
    },
    error: 'Chosen an invalid folder!'
  });

  // Get parent ID, mark unchanged parent as no-op by returning undefined
  const parentId = number ? folders[number - 1].id : undefined;
  return parentId !== currentNode?.parentId ? parentId : undefined;
};
