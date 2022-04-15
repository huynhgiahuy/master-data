import { Button, Card, Form, Input, notification, Row, Col, Typography } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';
import { userActions } from '../store';

import styles from './AddUserPage.module.css';
import ErrorPage from './ErrorPage';

const { Text, Paragraph } = Typography;

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

            navigate("/");
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            openErrorNotification('topLeft', 'Enter valid values in required fields');
        }
    };

    const handleBack = () => {
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
            <Card loading={loading} title="User Detail" className={styles.card} style={{ textAlign: 'center', justifyContent: 'center' }} >
                {matchUser ?
                    (
                        <div>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={2} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>Name:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.name}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={2} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>Username:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.username}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={2} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>Email:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.email}</Paragraph>
                                </Col>
                            </Row>
                            <Button className={styles.cancel} danger onClick={handleBack}>
                                Back
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Form form={form} name="dynamic_rule">
                                <h1>User with ID - {id} does not exist</h1>
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
