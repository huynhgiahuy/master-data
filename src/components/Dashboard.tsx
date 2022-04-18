import React, { FC, useState } from 'react';
import { Button, Card, Modal, notification, Space, Table, Input } from 'antd';
import "./DashboardAntD.css";
import { Address, User } from '../models/userModel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { NotificationPlacement } from 'antd/lib/notification';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './Dashboard.module.css';

interface DashboardProp {
  loading: boolean;
  user: User[];
}

const Dashboard: FC<DashboardProp> = (props) => {
  const { user, loading } = props;
  const dispatch = useDispatch();

  console.log(user);

  const { confirm } = Modal;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center' as 'center',
      sorter: {
        compare: (a: { id: any; }, b: { id: any; }) => a.id - b.id
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string | any[]; }, b: { name: string | any[]; }) => a.name.toLocaleString().localeCompare(b.name.toLocaleString())
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: (a: { username: string | any[]; }, b: { username: string | any[]; }) => a.username.toLocaleString().localeCompare(b.username.toLocaleString())
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: { email: string | any[]; }, b: { email: string | any[]; }) => a.email.toLocaleString().localeCompare(b.email.toLocaleString())
    },
    {
      title: 'Action',
      key: 'id' || 'delete' || 'detail',
      align: 'center' as 'center',
      render: (record: { id: number; name: string }) => (
        <Space size='middle'>
          <Link to={`detail/${record.id}`}>
            <EyeOutlined style={{ fontSize: '20px', color: 'blue' }} />
          </Link>
          <Link to={`/edit/${record.id}`}>
            <EditOutlined style={{ fontSize: '20px', color: 'rgb(255 193 6)' }} />
          </Link>
          <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => handleDelete(record.id, record.name)} />
        </Space>
      ),
    },
  ];

  const openErrorNotification = (placement: NotificationPlacement | undefined, msg: string) => {
    notification.error({
      message: msg,
      placement,
    });
  };

  const handleDelete = (id: number, name: string) => {
    confirm({
      title: 'Delete',
      content: `Are you sure you want to delete ${name}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        dispatch(userActions.DeleteUser(id));
        openErrorNotification('topLeft', 'User Deleted');
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        console.log('Cancel');
        openErrorNotification('topLeft', 'Delete Canceled');
      },
    });
  }

  function onChange(filters: any, sorter: any, extra: any) {
    console.log('params', filters, sorter, extra);
  }

  //Search Table
  const [filterInput, setFilterInput] = useState('')
  const filterData = () => {
    if (filterInput === '') return user

    if (filterInput) {
      return user.filter(({ id, name, username, email }) =>
        name.includes(filterInput)
        || name.toLocaleLowerCase().includes(filterInput)
        || name.toLocaleUpperCase().includes(filterInput)
        ||
        username.includes(filterInput)
        || username.toLocaleLowerCase().includes(filterInput)
        || username.toLocaleUpperCase().includes(filterInput)
        ||
        email.includes(filterInput)
        || email.toLocaleLowerCase().includes(filterInput)
        || email.toLocaleUpperCase().includes(filterInput)
        ||
        id.toString().includes(filterInput)
        || id.toLocaleString().toLocaleLowerCase().includes(filterInput)
        || id.toLocaleString().toLocaleUpperCase().includes(filterInput)
      )
    }
    return user
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value)
    if (e.target.value === '') {
      return user
    }
  }

  return (
    <div>
      <Card
        className={styles.card}
        loading={loading}
        title="User List"
        extra={
          <Link to="/add">
            <Button
              type="primary"
              style={{ borderRadius: '6px', width: '6rem', backgroundColor: 'green', borderColor: 'green' }}
            >
              Add User
            </Button>
          </Link>
        }>
        <Input.Search
          style={{ margin: '0 0 10px 0' }}
          placeholder="Search something..."
          enterButton
          allowClear
          value={filterInput}
          onSearch={setFilterInput}
          onChange={handleChange}
        />
        <Table
          columns={columns}
          dataSource={filterData()}
          pagination=
          {{
            defaultPageSize: 3,
            showSizeChanger: true,
            pageSizeOptions: ['3', '6', '10'],
            total: user.length,
            showTotal: total => `Total ${total} users`
          }}
          onChange={onChange} scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>);
};

export default Dashboard;
