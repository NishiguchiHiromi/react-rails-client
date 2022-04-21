import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import { Route, Switch, withRouter } from 'react-router-dom';
import useDoubleClick from 'hooks/useDoubleClick';
import useFileTree from 'hooks/useFileTree';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Treebeard } from 'react-treebeard';

const d = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' },
      ],
    },
    {
      name: 'loading parent',
      loading: true,
      children: [],
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' },
          ],
        },
      ],
    },
  ],
};

const TreeExample = () => {
  const [data, setData] = useState(d);
  const [cursor, setCursor] = useState(false);

  const onToggle = (node, toggled, ...rest) => {
    console.log('toggle', node, toggled, rest);
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setData({ ...data });
  };

  return (
    <Treebeard data={data} onToggle={onToggle} />
  );
};
export default TreeExample;


// function MinusSquare(props) {
//   return (
//     <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
//       {/* tslint:disable-next-line: max-line-length */}
//       <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
//     </SvgIcon>
//   );
// }

// function PlusSquare(props) {
//   return (
//     <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
//       {/* tslint:disable-next-line: max-line-length */}
//       <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
//     </SvgIcon>
//   );
// }

// function CloseSquare(props) {
//   return (
//     <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
//       {/* tslint:disable-next-line: max-line-length */}
//       <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
//     </SvgIcon>
//   );
// }

// function TransitionComponent(props) {
//   const style = useSpring({
//     from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
//     to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
//   });

//   return (
//     <animated.div style={style}>
//       <Collapse {...props} />
//     </animated.div>
//   );
// }

// TransitionComponent.propTypes = {
//   /**
//    * Show the component; triggers the enter or exit states
//    */
//   in: PropTypes.bool,
// };

// const StyledTreeItem = ({ isEditing, ...props }) => {
//   const styles = useStylesItem({ isEditing });
//   return <TreeItem classes={styles} {...props} TransitionComponent={TransitionComponent} />;
// };

// const useStylesItem = makeStyles((theme) => ({
//   label: ({ isEditing }) => (isEditing ? { padding: 0 } : {}),
//   iconContainer: {
//     '& .close': {
//       opacity: 0.3,
//     },
//   },
//   group: {
//     marginLeft: 7,
//     paddingLeft: 18,
//     borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
//   },
// }));

// const useStyles = makeStyles({
//   root: {
//     height: 264,
//     flexGrow: 1,
//     maxWidth: 400,
//   },
// });


// const CustomizedTreeView = () => {
//   const [treeData, { rename }] = useFileTree();
//   const [editId, setEditId] = useState(null);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [open, setOpen] = useState(false);

//   const classes = useStyles();
//   const multiSelect = true;

//   const onNodeSelect = (event, value) => {
//     if (value.length === 1 && selectedIds.length === 1 && value[0] === selectedIds[0]) {
//       setEditId(value[0]);
//     } else {
//       setEditId(null);
//     }
//     setSelectedIds(value);
//   };
//   const onDoubleClick = (event, value) => {
//     console.log('ファイル開いたよid": ', event, value);
//     setEditId(null);
//     setSelectedIds(value);
//   };

//   const onContextMenu = (e, id) => {
//     // e.stopPropagation();
//     // e.preventDefault();
//     // console.log('右クリ', id, e);
//     // handleOpen();
//   };

//   const onNodeToggle = (event, nodeIds) => {
//     console.log('onNodeToggle', event.target, nodeIds);
//   };


//   const [onClicks] = useDoubleClick({
//     onClick: onNodeSelect,
//     onDoubleClick,
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const renderTree = (nodes) => {
//     const isEditing = nodes.id === editId;
//     return (
//     // <div style={{ display: 'flex' }}>
//       <StyledTreeItem
//         key={nodes.id}
//         nodeId={nodes.id}
//         label={isEditing
//           ? console.log(nodes) || (
//           <input
//             value={nodes.name}
//             onChange={(e) => rename({ id: nodes.id, name: e.target.value })}
//           />
//           ) : nodes.name}
//         isEditing={isEditing}
//         onContextMenu={(e) => onContextMenu(e, nodes.id)}
//       >
//         {/* {isEditing
//           ? console.log(nodes) || (
//             <input
//               value={nodes.name}
//               onChange={(e) => rename({ id: nodes.id, name: e.target.value })}
//             />
//           ) : nodes.name} */}
//         {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
//       </StyledTreeItem>


//     );
//   };

//   return (
//     <>
//       <TreeView
//         className={classes.root}
//         multiSelect={multiSelect}
//         defaultExpanded={['root', '3']}
//         selected={selectedIds}
//         defaultCollapseIcon={<MinusSquare />}
//         defaultExpandIcon={<PlusSquare />}
//         defaultEndIcon={<CloseSquare />}

//         onNodeSelect={onClicks}
//         // onNodeToggle={onNodeToggle}
//       >
//         {treeData && renderTree(treeData)}
//       </TreeView>
//       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">名前の変更</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="name"
//             label="Email Address"
//             type="email"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             キャンセル
//           </Button>
//           <Button onClick={handleClose} color="primary">
//             保存
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CustomizedTreeView;
