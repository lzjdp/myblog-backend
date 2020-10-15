import React, { FC, useState, useRef } from 'react';
import { message, Button, Modal } from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { getArticleList, removeArticles } from '@/services/article';
const ArticleList:FC = () => {
  const [selectedRowsState, setSelectedRowsState] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const ref = useRef<ActionType>();
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 72
    },
    {
      title: '编号',
      dataIndex: 'article_id',
    },
    {
      title: '标题',
      dataIndex: 'article_title',
      valueType: 'text'
    },
    {
      title: '分类',
      dataIndex: 'article_classify',
      valueType: 'text'
    },
    {
      title: '创建时间',
      dataIndex: 'article_createTime',
      valueType: 'dataTime'
    }
  ];
  const handleRemove = (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    removeArticles({
      id: selectedRows.map(row => row.article_id)
    }).then(res => {
      hide();
      if (res.status && res.status === 200) {
        setDeleteModal(false);
        message.success('删除成功，即将刷新');
        return true;
      } else {
        setDeleteModal(false);
        message.error('删除失败');
        return false;
      }
    }).catch(error => {
      setDeleteModal(false);
      message.error(error);
      return false;
    })
  }
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRowsState(selectedRows)
        }}
        request={(params) => {
          return new Promise((resolve, reject) => {
            getArticleList(params).then(res => {
              const data = res.data
              resolve(data)
            }).catch(error => {
              message.error(error)
            })
          })
        }}
        actionRef={ref}
      />
      {
        selectedRowsState.length > 0 && (<FooterToolbar
          extra={
            <div>
              已选择<a style={{fontWeight: 600}}>{selectedRowsState.length}</a>项
            </div>
          }
        >
          <Button onClick={() => {
            setDeleteModal(true);
          }}>批量删除</Button>
          <Modal
            title="提示"
            visible={deleteModal}
            onCancel={() => {
              setDeleteModal(false);
            }}
            onOk={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRowsState([]);
              ref.current.reloadAndRest();
            }}
          >
            <p>确认删除文章？删除后不可恢复，请谨慎操作！</p>
          </Modal>
        </FooterToolbar>)
      }
    </PageContainer>
  );
};

export default ArticleList;
