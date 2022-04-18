import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { access_tokenSelector, todoListRemainSelector } from './../../app/selector.js';
import { useEffect, useState } from 'react';
import { TODOLIST_ADD_REQUEST, TODOLIST_LISTING_REQUEST, TODO_UPDATE_REQUEST } from './slice.js';
import { usePrevious } from './../../app/util.js';
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
  const access_token = useSelector(access_tokenSelector);
  const dispatch = useDispatch();
  const todoList = useSelector(todoListRemainSelector);
  useEffect(() => {
    access_token && dispatch(TODOLIST_LISTING_REQUEST());
  }, [access_token, dispatch]);
  const [btnTxt, setBtnTxt] = useState('Add');
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [id, setSelected] = useState(null);
  const prevTodoListLength = usePrevious(todoList.length);
  useEffect(() => {
    if (todoList.length >= prevTodoListLength) {
      setName('');
      setPriority('Medium');
      setBtnTxt('Add');
    }
  }, [todoList, prevTodoListLength]);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePriority = (e) => {
    setPriority(e);
  };
  const handleClickAdd = () => {
    btnTxt === 'Add'
      ? dispatch(
          TODOLIST_ADD_REQUEST({
            id: uuidv4(),
            name,
            priority,
            completed: false,
          })
        )
      : dispatch(
          TODO_UPDATE_REQUEST({
            id,
            data: {
              name,
              priority,
            },
          })
        );
  };
  return (
    <Row>
      <Col span={24} style={{ overflowY: 'auto', height: 'calc(100vh - 460px)' }}>
        {todoList.map((item) => (
          <Todo
            id={item.id}
            key={item.id}
            name={item.name}
            priority={item.priority}
            completed={item.completed}
            setName={setName}
            setPriority={setPriority}
            setBtnTxt={setBtnTxt}
            setSelected={setSelected}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={name} onChange={handleChangeName} />
          <Select value={priority} onChange={handleChangePriority} defaultValue='Medium'>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handleClickAdd} type='primary'>
            {btnTxt}
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
