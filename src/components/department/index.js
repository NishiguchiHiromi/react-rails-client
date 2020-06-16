import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { v4 as uuidv4 } from 'uuid';
import styled, { css } from 'styled-components';
import {
  IconButton, Box, InputBase, Button,
} from '@material-ui/core';
import update from 'immutability-helper';
import ReorderIcon from '@material-ui/icons/Reorder';
import CloseIcon from '@material-ui/icons/Close';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sortly, {
  add, remove, insert, findParent, ContextProvider, useDrag, useDrop, useIsClosestDragging,
} from 'react-sortly';
import api from 'service/api';
import useDepartmentsFetch from 'hooks/useDepartmentsFetch';

const Index = ({ match }) => (
  <div>
    組織管理
    <DndProvider backend={HTML5Backend}>
      <ContextProvider>
        <MySortableTree />
      </ContextProvider>
    </DndProvider>
  </div>
);
export default Index;

const MySortableTree = () => {
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
    api.saveDepartments(data).then((res) => setItems(res.data));
  };

  return (
    <Box width={{ md: 600 }}>
      <Flipper
        flipKey={items.map(({ id }) => id).join('.')}
      >
        <Sortly items={items} onChange={handleChange}>
          {(props) => (
            <ItemRenderer
              {...props}
              onChangeName={handleChangeName}
              onDelete={handleDelete}
            />
          )}
        </Sortly>
      </Flipper>
      <Box mt={4}>
        <Button variant="outlined" onClick={handleClickAdd}>新しい部署を追加</Button>
        <Button variant="outlined" onClick={handleSave}>保存</Button>
      </Box>
    </Box>
  );
};

export const DepartmentWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  z-index: ${({ muted }) => (muted ? 1 : 0)};
`;

export const Department = styled.div`
  display: flex;
  background: #fff;
  cursor: move;
  margin-left: ${({ depth }) => `${depth * 20}px`};
  box-shadow: ${({ muted }) => (muted ? '0px 0px 8px #666' : '0px 0px 2px #666')};
  border: ${({ muted }) => (muted ? '1px dashed #1976d2' : '1px solid transparent')};
`;


const ItemRenderer = React.memo((props) => {
  const {
    id, depth, data: { name, is_new }, onChangeName, onDelete,
  } = props;
  const handleChange = (e) => {
    const { value } = e.target;
    setTimeout(() => {
      onChangeName(id, value);
    }, 500);
  };
  const handleClickDelete = () => {
    onDelete(id);
  };
  const [{ isDragging }, drag, preview] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  const [, drop] = useDrop();

  const muted = useIsClosestDragging() || isDragging;

  return (
    <Flipped flipId={id}>
      <DepartmentWrapper ref={(ref) => drop(preview(ref))} muted={muted} depth={depth}>
        <Department muted={muted} depth={depth}>
          <IconButton ref={drag}><ReorderIcon /></IconButton>
          <Box display="flex" flex={1} px={1}>
            <InputBase
              fullWidth
              defaultValue={name}
              onChange={handleChange}
              autoFocus={is_new}
            />
          </Box>
          <IconButton onClick={handleClickDelete}><CloseIcon /></IconButton>
        </Department>
      </DepartmentWrapper>
    </Flipped>
  );
});
