import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Tag, Checkbox, Button, Typography, Anchor } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_DELETE_REQUEST, TODO_UPDATE_REQUEST } from './../TodoList/slice.js';
import { todoListRemainSelector } from './../../app/selector.js';
import moment from 'moment';

const { Text } = Typography;

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({
  id,
  name,
  priority,
  dueDate,
  completed,
  setName,
  setPriority,
  setBtnTxt,
  setSelected,
  setDueDate,
}) {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListRemainSelector);
  const [checked, setChecked] = useState(completed);
  const toggleCheckbox = () => {
    dispatch(TODO_UPDATE_REQUEST({ id, data: { completed: !completed } }));
  };
  const self = todoList.find((item) => item.id === id);
  const handleUpdateTodo = () => {
    setName(name);
    setPriority(priority);
    setBtnTxt('Adjust');
    setSelected(id);
    setDueDate(dueDate);
  };
  const handleDeleteTodo = () => {
    dispatch(TODO_DELETE_REQUEST({ id }));
  };
  useEffect(() => {
    setChecked(self.completed);
  }, [self.completed]);
  return (
    <Row
      justify='space-between'
      style={{
        marginBottom: 3,
      }}
    >
      <Row
        justify='space-between'
        style={{ flex: 1, ...(checked ? { opacity: 0.5, textDecoration: 'line-through' } : {}) }}
      >
        <div>
          <Checkbox checked={checked} onChange={toggleCheckbox}></Checkbox>
          <a href={`/todo/${id}`} style={{ marginLeft: '5px' }}>
            {name}
          </a>
        </div>
        <div style={{ display: 'flex' }}>
          <Text>{moment.utc(dueDate, 'YYYY/MM/DD').format('DD/MM/YYYY').toString()}</Text>
          <Tag color={priorityColorMapping[priority]} style={{ marginRight: 0, marginLeft: '5px' }}>
            {priority}
          </Tag>
        </div>
      </Row>
      <Row>
        <Button onClick={handleUpdateTodo} style={{ marginLeft: '5px' }} type='primary' ghost size='small'>
          <EditOutlined />
        </Button>
        <Button onClick={handleDeleteTodo} style={{ marginLeft: '5px' }} type='primary' danger size='small'>
          <CloseOutlined />
        </Button>
      </Row>
    </Row>
  );
}
