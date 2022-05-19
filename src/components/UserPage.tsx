import React, { FC, useState } from 'react';
import { Button, Card, notification, Space, Table, Input, Popover } from 'antd';
import { User } from '../models/userModel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';
import { NotificationPlacement } from 'antd/lib/notification';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserAddOutlined } from '@ant-design/icons';
import styles from '../styles/Dashboard.module.css';
import { useTranslation } from 'react-i18next';
import '../styles/DashboardAntD.css';

interface DashboardProp {
  loading: boolean;
  user: User[];
}

const UserPage: FC<DashboardProp> = (props) => {
  const { user, loading } = props
  const dispatch = useDispatch()

  console.log(user)

  const { t } = useTranslation(["body"])

  const columns = [
    {
      title: t("tableItems.userId"),
      dataIndex: 'id',
      key: 'id',
      align: 'center' as 'center',
      sorter: {
        compare: (a: { id: any; }, b: { id: any; }) => a.id - b.id
      },
    },
    {
      title: t("tableItems.userName"),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: { name: string | any[]; }, b: { name: string | any[]; }) => a.name.toLocaleString().localeCompare(b.name.toLocaleString())
    },
    {
      title: t("tableItems.userUserName"),
      dataIndex: 'username',
      key: 'username',
      sorter: (a: { username: string | any[]; }, b: { username: string | any[]; }) => a.username.toLocaleString().localeCompare(b.username.toLocaleString())
    },
    {
      title: t("tableItems.userEmail"),
      dataIndex: 'email',
      key: 'email',
      sorter: (a: { email: string | any[]; }, b: { email: string | any[]; }) => a.email.toLocaleString().localeCompare(b.email.toLocaleString())
    },
    {
      title: t("tableItems.userAction"),
      key: 'id' || 'delete' || 'detail',
      align: 'center' as 'center',
      render: (record: { id: number }) => (
        <Space size='large'>
          <Link to={`/user/detail/${record.id}`}>
            <Popover content={t("tableButtons.detailButton")}>
              <EyeOutlined style={{ fontSize: '20px', color: 'blue' }} />
            </Popover>
          </Link>
          <Link /*to={`/user/edit/${record.id}`}*/ to={""}>
            <Popover content={t("tableButtons.editButton")}>
              <EditOutlined style={{ fontSize: '20px', color: 'rgb(255 193 6)' }} />
            </Popover>
          </Link>
          <Popover content={t("tableButtons.deleteButton")}>
            <DeleteOutlined style={{ fontSize: '20px', color: 'red' }} onClick={() => handleDelete(record.id)} />
          </Popover>
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

  const handleDelete = (id: number) => {
    dispatch(userActions.DeleteUser(id));
    openErrorNotification('topRight', t("actionMessages.deleteMessage"));
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
        id.toString().includes(filterInput)
        || id.toString().toLowerCase().includes(filterInput)
        || id.toString().toUpperCase().includes(filterInput)
        ||
        name.includes(filterInput)
        || name.toLowerCase().includes(filterInput)
        || name.toUpperCase().includes(filterInput)
        ||
        username.includes(filterInput)
        || username.toLowerCase().includes(filterInput)
        || username.toUpperCase().includes(filterInput)
        ||
        email.includes(filterInput)
        || email.toLowerCase().includes(filterInput)
        || email.toUpperCase().includes(filterInput)
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
        title={t("tableItems.userList")}
        extra={
          <Link to="/user/add">
            <Button
              type="primary"
              style={{
                borderRadius: '6px',
                width: '8rem',
                backgroundColor: 'green',
                borderColor: 'green'
              }}
              icon={<UserAddOutlined />}
              disabled
            >
              {t("tableButtons.addUserButton")}
            </Button>
          </Link>
        }>
        <Popover content={t("tableButtons.searchButton")}>
          <Input.Search
            style={{ margin: '0 0 10px 0' }}
            placeholder={t("tableButtons.searchButton")}
            enterButton
            allowClear
            value={filterInput}
            onSearch={setFilterInput}
            onChange={handleChange}
          />
        </Popover>
        <Table
          columns={columns}
          dataSource={filterData()}
          pagination={{ hideOnSinglePage: true }}
          onChange={onChange}
        />
      </Card>
    </div>
  );
};

export default UserPage;
