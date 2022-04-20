import './index.css';
import React from 'react';
import { Typography, Divider } from 'antd';
import Filters from './../Filters/index';
import TodoList from './../TodoList/index';

const { Title } = Typography;

function Home() {
  return (
    <div
      style={{
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        minHeight: 'calc(100vh - 80px)',
        margin: '0 auto',
      }}
    >
      <Title style={{ textAlign: 'center' }}>TODO APP with REDUX</Title>
      <Filters />
      <Divider />
      <TodoList />
    </div>
  );
}

export default Home;
