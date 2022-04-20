import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Row, Tag, Checkbox, Button, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_DELETE_REQUEST, TODO_UPDATE_REQUEST } from './../TodoList/slice.js';
import { todoListRemainSelector } from './../../app/selector.js';
import moment from 'moment';

const priorityColorMapping = {
  High: 'red',
  Medium: 'blue',
  Low: 'gray',
};

export default function Todo({ id, name, priority, dueDate, completed, setName, setPriority, setBtnTxt, setSelected }) {
  const dispatch = useDispatch();
  const todoList = useSelector(todoListRemainSelector);
  const [checked, setChecked] = useState(completed);
  const [date, setDate] = useState(dueDate);
  const toggleCheckbox = () => {
    dispatch(TODO_UPDATE_REQUEST({ id, data: { completed: !completed } }));
  };
  const self = todoList.find((item) => item.id === id);
  const handleUpdateTodo = () => {
    setName(name);
    setPriority(priority);
    setBtnTxt('Adjust');
    setSelected(id);
  };
  const handleDeleteTodo = () => {
    dispatch(TODO_DELETE_REQUEST({ id }));
  };
  useEffect(() => {
    setChecked(self.completed);
  }, [self.completed]);
  const handleUpdateDueDate = (value) => {
    setDate(value.toDate());
    dispatch(TODO_UPDATE_REQUEST({ id, data: { dueDate: value.toDate() } }));
  };
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
        <Checkbox checked={checked} onChange={toggleCheckbox}>
          {name}
        </Checkbox>
        <div style={{ display: 'flex' }}>
          <DatePicker
            onChange={handleUpdateDueDate}
            size='small'
            format='DD/MM/YYYY'
            value={moment.utc(date, 'YYYY/MM/DD') || moment.utc()}
            style={{ width: '105px' }}
          />
          <Tag color={priorityColorMapping[priority]} style={{ margin: 0 }}>
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
