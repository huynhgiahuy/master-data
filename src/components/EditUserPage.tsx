import { Button, Card, Form, Input, notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';
import { userActions } from '../store';
import styles from '../styles/AddUserPage.module.css';
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

const EditUserPage = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.users);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const matchUser = data.find(user => user.id === parseInt(id as string));
  const matchUserID = matchUser?.id;

  console.log(matchUser);

  console.log(matchUser?.address.city)

  const openSuccessNotification = (placement: NotificationPlacement | undefined) => {
    notification.success({
      message: 'User Edited successfully',
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

      const checkEmail = data.find(user => user.email === values.email && user.id !== matchUserID);

      const checkUsername = data.find(user => user.username === values.username && user.id !== matchUserID);

      if (!values.name || !values.email) {
        return openErrorNotification('topLeft', 'Input Field is empty!');
      }

      if (checkEmail) {
        return openErrorNotification('topLeft', 'This email already exists!');
      }

      if (checkUsername) {
        return openErrorNotification('topLeft', 'This username already exists!');
      }

      dispatch(userActions.EditUser(matchUserID as number, values));
      openSuccessNotification('topRight');

      navigate("/user");
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      openErrorNotification('topLeft', 'Enter valid values in required fields');
    }
  };

  const handleCancel = () => {
    navigate("/user");
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
      <Card loading={loading} title="Edit User" className={styles.card}>
        {matchUser ?
          (
            <Form form={form} initialValues={matchUser} name="dynamic_rule" onFinish={onFinish}>
              <Form.Item
                {...formItemLayout}
                name="name"
                label="Name"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please input your name',
                  },
                  {
                    min: 5,
                    message: 'Name has at least 5 characters!',
                  },
                  {
                    max: 40,
                    message: 'Name has at most 40 characters!'
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
                  {
                    min: 3,
                    message: 'Username has at least 3 characters!',
                  },
                  {
                    max: 25,
                    message: 'Username has at most 25 characters!'
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
          ) : (
            <>
              <Form form={form} name="dynamic_rule">
                <h1 style={{ textAlign: 'center', justifyContent: 'center' }}>User with ID - {id} does not exist</h1>
                <Link to="/"> <Button style={{ width: '100%' }} type="primary">Back to User List</Button> </Link>
              </Form>
            </>
          )
        }
      </Card>
    </div>
  );
};

export default EditUserPage;
