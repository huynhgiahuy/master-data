import { Button, Card, Form, Row, Col, Typography } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from '../hooks/useTypedSelector';
import styles from '../styles/AddUserPage.module.css';
import ErrorPage from './ErrorPage';
import { useTranslation } from 'react-i18next';

const { Text, Paragraph } = Typography;

const PostDetailPage = () => {
    const { loading, error, dataPost } = useSelector(state => state.posts);

    const { id } = useParams();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const matchPost = dataPost.find(post => post.id === parseInt(id as string));

    console.log(matchPost);

    const { t } = useTranslation(["body"])

    const handleBack = () => {
        navigate("/post");
    }

    if (error && dataPost.length === 0) {
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
                title={t("tableItems.postDetail")}
                className={styles.card}
                style={{ textAlign: 'center', justifyContent: 'center' }}
            >
                {matchPost ?
                    (
                        <>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={5} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.postId")}:</Text>
                                </Col>
                                <Col md={15} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchPost.id}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={5} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.postTitle")}:</Text>
                                </Col>
                                <Col md={15} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchPost.title}</Paragraph>
                                </Col>
                            </Row>
                            <Row style={{ textAlign: 'center', justifyContent: 'center' }}>
                                <Col md={5} style={{ textAlign: 'left' }}>
                                    <Text strong style={{ fontSize: 'bold' }}>{t("tableItems.postBody")}:</Text>
                                </Col>
                                <Col md={15} style={{ textAlign: 'right' }}>
                                    <Paragraph >{matchPost.body}</Paragraph>
                                </Col>
                            </Row>
                            <Button className={styles.cancel} danger onClick={handleBack}>
                                {t("tableButtons.backButton")}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Form form={form} name="dynamic_rule">
                                <h1>Post with P_ID - {id} does not exist</h1>
                                <Link
                                    to="/post"
                                >
                                    <Button style={{ width: '100%' }} type="primary">Back to Post List</Button>
                                </Link>
                            </Form>
                        </>
                    )
                }
            </Card>
        </>
    );
};

export default PostDetailPage;
