import { useState, useEffect } from 'react';
import { jsonDeepCopy } from 'shared/util';

const useFileTree = () => {
  const [tree, setTree] = useState(null);
  const rename = ({ id, name }) => {
    const newTree = jsonDeepCopy(tree);
    const item = find(id, newTree.children);
    item.name = name;
    setTree(newTree);
  };
  // const findItem = (id) => find(id, jsonDeepCopy(tree.children));
  const find = (id, list) => {
    let result;
    if (!list) return;
    list.some((item) => {
      if (item.id === id) {
        result = item;
      } else {
        const search = find(id, item.children);
        if (search) result = search;
      }
      return !!result;
    });
    return result;
  };

  useEffect(() => {
    setTree(data);
  }, []);
  return [tree, { rename }];
};
export default useFileTree;

const data = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
        {
          id: '5',
          name: 'Child - 5',
        },
      ],
    },
  ],
};
