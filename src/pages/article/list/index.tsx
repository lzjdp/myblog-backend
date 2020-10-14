import React, { FC } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
const ArticleList:FC = () => {
  const columns = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '作者',
      dataIndex: 'author'
    }
  ];
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        request={async (params) => {
          return {
            data: [
              {
                key: '1',
                title: 'umi教程',
                author: 'carr'
              }
            ]
          }
        }}
      />
    </PageContainer>
  );
};

export default ArticleList;
