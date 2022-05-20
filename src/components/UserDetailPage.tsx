import { Button, Card, Form, Row, Col, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';
import styles from '../styles/AddUserPage.module.css';
import ErrorPage from './ErrorPage';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

const UserDetailPage = () => {
    const { loading, error, data } = useSelector(state => state.users);

    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const matchUser = data.find(user => user.id === parseInt(id as string));

    console.log(matchUser);

    const { t } = useTranslation(["body"])

    const handleBack = () => {
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
        <>
            <Card
                loading={loading}
                title={t("tableItems.userDetail")}
                className={styles.card}
                style={{ textAlign: 'center', justifyContent: 'center' }}
            >
                {matchUser ?
                    (
                        <>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={4} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.userId")}:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.id}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={4} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.userName")}:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.name}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={4} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.userUserName")}:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.username}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={4} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.userEmail")}:</Text>
                                </Col>
                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchUser.email}</Paragraph>
                                </Col>
                            </Row>
                            <Button className={styles.cancel} danger onClick={handleBack}>
                                {t("tableButtons.backButton")}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Form form={form} name="dynamic_rule">
                                <h1>User with ID - {id} does not exist</h1>
                                <Link
                                    to="/user"
                                >
                                    <Button style={{ width: '100%' }} type="primary">Back to User List</Button>
                                </Link>
                            </Form>
                        </>
                    )
                }
            </Card>
        </>
    );
};

export default UserDetailPage;
