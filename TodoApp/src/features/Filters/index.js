import { Col, Row, Input, Typography, Radio, Select, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FILTERS_CHANGE_PRIORITIES, FILTERS_CHANGE_SEARCH, FILTERS_CHANGE_STATUS } from './slice.js';
import { filtersSelector } from './../../app/selector.js';

const { Search } = Input;

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const handleChangeSearch = (e) => {
    dispatch(FILTERS_CHANGE_SEARCH(e.target.value));
  };
  const handleChangeStatus = (e) => {
    dispatch(FILTERS_CHANGE_STATUS(e.target.value));
  };
  const handleChangePriorities = (e) => {
    dispatch(FILTERS_CHANGE_PRIORITIES(e));
  };
  return (
    <Row justify='center'>
      <Col span={24}>
        <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
          Search
        </Typography.Paragraph>
        <Search value={filters.search} onChange={handleChangeSearch} placeholder='Whatever you want' />
      </Col>
      <Col sm={24}>
        <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
          Filter By Status
        </Typography.Paragraph>
        <Radio.Group value={filters.status} onChange={handleChangeStatus}>
          <Radio value='All'>All</Radio>
          <Radio value='Completed'>Completed</Radio>
          <Radio value='Todo'>To do</Radio>
        </Radio.Group>
      </Col>
      <Col sm={24}>
        <Typography.Paragraph style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10 }}>
          Filter By Priority
        </Typography.Paragraph>
        <Select
          value={filters.priorities}
          onChange={handleChangePriorities}
          mode='multiple'
          allowClear
          placeholder='Please select'
          style={{ width: '100%' }}
        >
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
      </Col>
    </Row>
  );
}
