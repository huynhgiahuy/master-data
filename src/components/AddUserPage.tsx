import { Button, Card, Form, Input, notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';
import { userActions } from '../store';

import styles from './AddUserPage.module.css';
import ErrorPage from './ErrorPage';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formCheckboxLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddUserPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.users);

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const openSuccessNotification = (placement: NotificationPlacement | undefined) => {
    notification.success({
      message: 'User added successfully',
      placement,
    });
  };

  const openErrorNotification = (placement: NotificationPlacement | undefined, msg: string) => {
    notification.error({
      message: msg,
      placement,
    });
  };

  const onFinish = async (values: any) => {
    try {
      console.log('Success:', values);

      const checkEmail = data.find(user => user.email === values.email);

      const checkUsername = data.find(user => user.username === values.username);

      if (!values.name || !values.email) {
        return openErrorNotification('topLeft', 'Input Field is empty!');
      }

      if (checkEmail) {
        return openErrorNotification('topLeft', 'This email already exists!');
      }

      if (checkUsername) {
        return openErrorNotification('topLeft', 'This username already exists!');
      }

      dispatch(userActions.AddUser(values));
      openSuccessNotification('topRight');

      navigate("/");
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      openErrorNotification('topLeft', 'Enter valid values in required fields');
    }
  };

  const handleCancel = () => {
    navigate("/");
  }

  if (error && data.length === 0) {
    return (
      <div className={styles.Error}>
        <ErrorPage error={error} />
      </div>
    )
  }

  return (
    <div>
      <Card loading={loading} title="Add User" className={styles.card}>
        <Form form={form} name="dynamic_rule" onFinish={onFinish}>
          <Form.Item
            {...formItemLayout}
            name="name"
            label="Name"
            hasFeedback
            colon
            rules={[
              {
                required: true,
                message: 'Please input your name',
              },
            ]}
          >
            <Input placeholder="Please enter your name" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="username"
            label="Username"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please input your username',
              },
            ]}
          >
            <Input placeholder="Please enter your username" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="email"
            label="Email"
            hasFeedback
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Please enter your email" />
          </Form.Item>

          <Form.Item className={styles.formButton}>
            <Button className={styles.cancel} danger onClick={handleCancel}>
              Cancel
            </Button>
            <Button className={styles.submit} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Card>
    </div>
  );
};

export default AddUserPage;
