import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import styled, { css } from 'styled-components';
import {
  IconButton, Box, InputBase, Button,
  Card, CardContent,
} from '@material-ui/core';
import ReorderIcon from '@material-ui/icons/Reorder';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sortly, {
  add, remove, insert, findParent, ContextProvider, useDrag, useDrop, useIsClosestDragging,
} from 'react-sortly';
import useDepartmentTree from 'hooks/useDepartmentTree';
import {
  Title, SimpleForm, Toolbar, Button as AdminButton, useNotify, useRefresh,
} from 'react-admin';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Index = () => {
  const [items, {
    handleChange, handleChangeName, handleDelete, handleClickAdd, handleSave,
  }] = useDepartmentTree();

  console.log('Index', items);
  return (
    <Card>
      <Title title="組織図" />
      <DndProvider backend={HTML5Backend}>
        <ContextProvider>
          <MySortableTree
            items={items}
            handleChange={handleChange}
            handleChangeName={handleChangeName}
            handleDelete={handleDelete}
          />
        </ContextProvider>
      </DndProvider>
      <CustomToolbar
        handleAdd={handleClickAdd}
        handleSave={handleSave}
      />
    </Card>
  );
};
export default Index;

const MySortableTree = (props) => {
  const {
    items, handleChange, handleChangeName, handleDelete,
  } = props;
  return (
    <Box width={{ md: 600 }}>
      <Flipper
        flipKey={items.map(({ id }) => id).join('.')}
      >
        <Sortly items={items} onChange={handleChange}>
          {(itemProps) => (
            <ItemRenderer
              {...itemProps}
              onChangeName={handleChangeName}
              onDelete={handleDelete}
            />
          )}
        </Sortly>
      </Flipper>
    </Box>
  );
};

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

const CustomToolbar = ({ handleAdd, handleSave, ...props }) => (
  <Toolbar {...props} classes={useStyles()}>
    <SaveButton handleSave={handleSave} />
    <AdminButton label="Add" onClick={handleAdd} />
  </Toolbar>
);

const SaveButton = ({ handleSave, ...props }) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const save = () => {
    handleSave().then(() => {
      notify('ra.notification.updated', 'info', { smart_count: 1 });
      refresh();
    }).catch((error) => {
      console.log('profile error', [error]);
      notify(
        typeof error === 'string'
          ? error
          : error.message || 'ra.notification.http_error',
        'warning',
      );
    });
  };

  return <AdminButton label="Save" onClick={save} disabled={false} />;
};

const DepartmentWrapper = styled.div`
  position: relative;
  margin-bottom: 10px;
  z-index: ${({ muted }) => (muted ? 1 : 0)};
`;

const Department = styled.div`
  display: flex;
  background: #fff;
  cursor: move;
  margin-left: ${({ depth }) => `${depth * 20}px`};
  box-shadow: ${({ muted }) => (muted ? '0px 0px 8px #666' : '0px 0px 2px #666')};
  border: ${({ muted }) => (muted ? '1px dashed #1976d2' : '1px solid transparent')};
`;
