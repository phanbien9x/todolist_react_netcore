import './style.css';
import React from 'react';
import { Typography, Spin, Divider } from 'antd';
import { useSelector } from 'react-redux';
import { loaderSelector } from '../../app/selector';
import Filters from './../Filters/index';
import TodoList from './../TodoList/index';

const { Title } = Typography;

function Home() {
  const loader = useSelector(loaderSelector);
  return (
    <Spin tip='Loading' spinning={loader.loading} wrapperClassName='main__spin__container'>
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
        }}
      >
        <Title style={{ textAlign: 'center' }}>TODO APP with REDUX</Title>
        <Filters />
        <Divider />
        <TodoList />
      </div>
    </Spin>
  );
}

export default Home;
