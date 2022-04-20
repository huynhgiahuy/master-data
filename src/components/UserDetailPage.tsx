import { Button, Card, Form, Row, Col, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';

import styles from './AddUserPage.module.css';
import ErrorPage from './ErrorPage';

const { Text, Paragraph } = Typography;

const EditUserPage = () => {
    const { loading, error, data } = useSelector(state => state.users);

    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const matchUser = data.find(user => user.id === parseInt(id as string));

    console.log(matchUser);

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
