/*
 * @Author: your name
 * @Date: 2020-10-14 14:09:15
 * @LastEditTime: 2020-10-15 14:56:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /log-backend/src/services/article.ts
 */
import request from '@/utils/request';

export async function getArticleList(params) {
    return request('/api/article', {
      params
    });
}

export async function  removeArticles(params) {
  return request('/api/article', {
    method: 'delete',
    data: params
  });
}
