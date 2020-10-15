/*
 * @Author: your name
 * @Date: 2020-10-14 15:09:06
 * @LastEditTime: 2020-10-15 15:13:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /log-backend/mock/article.ts
 */
import { Request, Response } from 'express';

const list = (total) => {
  const articleList = [];
  let num = 1;
  for (let i = 0; i < total; i++ ) {
    articleList.push({
      key: i,
      article_id: num++,
      article_title: `Umi+Egg搭建博客${i}`,
      article_classify: 'react',
      article_createTime: new Date()
    })
  }
  return articleList
}

let articleList = list(50);

const getArticleList = (req, res) => {
  const { current=1, pageSize=10 } = req.query;
  let dataSource = [...articleList].slice((current - 1)*pageSize, current*pageSize)
  const result = {
    code: 1,
    data: {
      data: dataSource
    },
  };
  res.json(result);
}

const removeArticles = (req, res) => {
  const data = {
    status: 200,
    msg: '删除成功'
  }
  res.json(data)
}

export default {
  'GET /api/article': getArticleList,
  'DELETE /api/article': removeArticles
}
