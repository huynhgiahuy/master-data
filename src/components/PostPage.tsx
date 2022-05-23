import React, { FC, useState } from 'react';
import { Button, Card, notification, Space, Table, Input, Popover } from 'antd';
import { Post } from '../models/postModel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postActions } from '../store';
import { NotificationPlacement } from 'antd/lib/notification';
import { EditOutlined, DeleteOutlined, EyeOutlined, UserAddOutlined } from '@ant-design/icons';
import styles from '../styles/Dashboard.module.css';
import { useTranslation } from 'react-i18next';
import '../styles/DashboardAntD.css'

interface DashboardProp {
    loading: boolean;
    post: Post[];
}

const PostPage: FC<DashboardProp> = (props) => {
    const { post, loading } = props;
    const dispatch = useDispatch();

    console.log(post);

    const { t } = useTranslation(["body"]);
    const columns = [
        {
            title: t("tableItems.postId"),
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center',
            sorter: {
                compare: (a: { id: any; }, b: { id: any; }) =>
                    a.id - b.id
            }
        },
        {
            title: t("tableItems.postTitle"),
            dataIndex: 'title',
            key: 'title',
            sorter: (a: { title: string | any[]; }, b: { title: string | any[]; }) =>
                a.title.toLocaleString().localeCompare(b.title.toLocaleString())
        },
        {
            title: t("tableItems.postBody"),
            dataIndex: 'body',
            key: 'body',
            sorter: (a: { body: string | any[]; }, b: { body: string | any[]; }) =>
                a.body.toLocaleString().localeCompare(b.body.toLocaleString())
        },
        {
            title: t("tableItems.postAction"),
            key: 'id' || 'delete' || 'detail',
            align: 'center' as 'center',
            render: (record: { id: number; name: string }) => (
                <Space size='large'>
                    <Link to={`/post/detail/${record.id}`}>
                        <Popover content={t("tableButtons.detailButton")}>
                            <EyeOutlined style={{ fontSize: '20px', color: 'blue' }} />
                        </Popover>
                    </Link>
                    <Link /*to={`/post/edit/${record.id}`}*/ to={""}>
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
        notification.success({
            message: msg,
            placement,
        });
    };

    const handleDelete = (id: number) => {
        dispatch(postActions.DeletePost(id));
        openErrorNotification('topRight', t("actionMessages.deletePostMessage"));
    }

    function onChange(filters: any, sorter: any, extra: any) {
        console.log('params', filters);
        dispatch(postActions.PaginationPosts(filters.current * filters.pageSize - filters.pageSize, filters.pageSize))
    }

    //Search Table
    /*const [filterInput, setFilterInput] = useState('')
    const filterData = () => {
        if (filterInput === '') return post

        if (filterInput) {
            return post.filter(({ id, userId, title, body }) =>
                id.toLocaleString().includes(filterInput)
                || id.toLocaleString().toLocaleLowerCase().includes(filterInput)
                || id.toLocaleString().toLocaleUpperCase().includes(filterInput)
                ||
                userId.toLocaleString().includes(filterInput)
                || userId.toLocaleString().toLocaleLowerCase().includes(filterInput)
                || userId.toLocaleString().toLocaleUpperCase().includes(filterInput)
                ||
                title.includes(filterInput)
                || title.toLocaleLowerCase().includes(filterInput)
                || title.toLocaleUpperCase().includes(filterInput)
                ||
                body.includes(filterInput)
                || body.toLocaleLowerCase().includes(filterInput)
                || body.toLocaleUpperCase().includes(filterInput)
            )
        }
        return post
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterInput(e.target.value)
        if (e.target.value === '') {
            return post
        }
    }*/

    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        dispatch(postActions.SearchPost(searchInput))
        setSearchInput("")
    }

    return (
        <>
            <Card
                className={styles.card}
                loading={loading}
                title={t("tableItems.postList")}
                extra={
                    <Link to="/post/add">
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
                            {t("tableButtons.addPostButton")}
                        </Button>
                    </Link>
                }>
                <Popover content={t("tableButtons.searchButton")}>
                    <Input.Search
                        style={{ margin: '0 0 10px 0' }}
                        placeholder={t("tableButtons.searchButton")}
                        enterButton
                        allowClear
                        value={searchInput}
                        onSearch={handleSearch}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </Popover>
                <Table
                    columns={columns}
                    dataSource={post}
                    pagination={{
                        locale: {
                            items_per_page: t("tablePaginations.itemsPerPage"),
                            next_page: t("tablePaginations.nextPage"),
                            prev_page: t("tablePaginations.prevPage"),
                            next_3: t("tablePaginations.next3Pages"),
                            next_5: t("tablePaginations.next5Pages"),
                            prev_3: t("tablePaginations.prev3Pages"),
                            prev_5: t("tablePaginations.prev5Pages")
                        },
                    }}
                    onChange={onChange}
                    locale={{
                        triggerAsc: t("tableColumns.sortColumnTooltipAsc"),
                        triggerDesc: t("tableColumns.sortColumnTooltipDsc"),
                        cancelSort: t("tableColumns.sortColumnTooltipCancel"),
                    }}
                />
            </Card>
        </>
    );
};

export default PostPage;
