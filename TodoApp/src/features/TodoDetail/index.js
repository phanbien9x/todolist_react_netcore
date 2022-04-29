import React, { useEffect, useState } from 'react';
import { Typography, Input, Button, Form, DatePicker, Select, Tag, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_DETAIL_REQUEST, TODO_UPDATE_REQUEST } from './slice';
import { useParams } from 'react-router-dom';
import { todoDetailSelector } from './../../app/selector.js';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { apiUploadAttachment, apiDeleteAttachment } from './api';

const { Title, Text } = Typography;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function TodoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const todoDetail = useSelector(todoDetailSelector);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  useEffect(() => {
    dispatch(TODO_DETAIL_REQUEST({ id }));
  }, [dispatch, id]);
  const [form] = Form.useForm();
  const upload = Form.useWatch('upload', form);
  useEffect(() => form.resetFields(), [todoDetail, form]);
  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = (values) => {
    const { name, priority, dueDate } = values;
    dispatch(
      TODO_UPDATE_REQUEST({
        id,
        data: {
          name,
          priority,
          dueDate: dueDate.toDate(),
        },
      })
    );
  };
  const uploadAttachment = async (options) => {
    const { onSuccess, onError, file } = options;

    const data = new FormData();
    data.append('file', file);
    try {
      const res = await apiUploadAttachment({ id, data });
      onSuccess(res.data);
      notification['success']({
        message: 'Success',
        description: 'Attachment upload complete!',
      });
    } catch (err) {
      onError();
      notification['error']({
        message: 'Error',
        description: err.toString(),
      });
    }
  };

  const deleteAttachment = async (options) => {
    options?.response?.id && (options.id = options.response.id);
    const { id } = options;
    try {
      const res = await apiDeleteAttachment(id);
      notification['success']({
        message: 'Success',
        description: res.data,
      });
    } catch (err) {
      notification['error']({
        message: 'Error',
        description: err.toString(),
      });
    }
  };

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
        minHeight: 'calc(50vh)',
        margin: '0 auto',
      }}
    >
      <Title style={{ textAlign: 'center' }}>Todo Detail</Title>
      <Form
        labelCol={{
          span: 4,
        }}
        onFinish={onFinish}
        initialValues={{
          name: todoDetail.name,
          priority: todoDetail.priority,
          dueDate: moment.utc(todoDetail.dueDate),
          upload: todoDetail.attachments,
        }}
        form={form}
      >
        <Form.Item label='ID'>
          <Text>{id}</Text>
        </Form.Item>
        <Form.Item label='Name' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Priority' name='priority'>
          <Select>
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
        </Form.Item>
        <Form.Item label='DueDate' name='dueDate'>
          <DatePicker showTime allowClear={false} format='HH:mm:ss' inputReadOnly={true} />
        </Form.Item>
        <Form.Item label='Upload' name='upload' valuePropName='fileList' getValueFromEvent={handleChange}>
          <Upload
            customRequest={uploadAttachment}
            onRemove={deleteAttachment}
            listType='picture-card'
            onPreview={handlePreview}
          >
            {upload?.length >= 3 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Form.Item style={{ marginTop: 'auto' }}>
          <Button style={{ width: '100%' }} type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default TodoDetail;
