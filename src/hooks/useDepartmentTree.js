import { v4 as uuidv4 } from 'uuid';
import useDepartmentsFetch from 'hooks/useDepartmentsFetch';
import {
  add, remove, findParent,
} from 'react-sortly';
import update from 'immutability-helper';
import api from 'components/admin/provider/api';

const useDepartmentTree = () => {
  const [items, setItems] = useDepartmentsFetch();
  const handleChange = (newItems) => {
    if (newItems.some((item) => item.depth > 9)) {
      alert('10階層以上は作成できません');
      return;
    }
    setItems(newItems);
  };
  const handleChangeName = (id, name) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(update(items, {
      [index]: { name: { $set: name } },
    }));
  };
  const handleDelete = (id) => {
    const index = items.findIndex((item) => item.id === id);
    setItems(remove(items, index));
  };

  const handleClickAdd = () => {
    setItems(add(items, {
      id: uuidv4(),
      name: '新しい部署',
      is_new: true,
    }));
  };

  const handleSave = () => {
    const data = [];

    const findItem = (list, id) => {
      let result;
      list.some((item) => {
        if (item.id === id) {
          result = item;
        } else {
          const search = findItem(item.children, id);
          if (search) result = search;
        }
        return !!result;
      });
      return result;
    };

    items.forEach((item, order) => {
      if (item.depth === 0) {
        data.push({ ...item, order, children: [] });
      } else {
        const parent = findParent(items, order);
        findItem(data, parent.id).children.push({ ...item, order, children: [] });
      }
    });
    console.log(data);
    return api.provider('departments/tree', {
      method: 'POST',
      body: { departments: data },
    }).then((res) => console.log(res));
  };
  return [items, {
    handleChange, handleChangeName, handleDelete, handleClickAdd, handleSave,
  }];
};
export default useDepartmentTree;
