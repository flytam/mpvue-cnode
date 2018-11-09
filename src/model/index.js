import flyio from "flyio/dist/npm/wx";
import { api } from "../const";
fly.config.baseURL = api;
const { post, get } = new flyio();
// 登录
export function login({ accesstoken }) {
  return post(`/accesstoken`, {
    accesstoken
  });
}

// 回复
export function reply({ topicId, content, replyId }) {
  return post(`/topic/${topicId}/replies`, {
    accesstoken,
    content,
    reply_id: replyId
  });
}

// 查询话题详情
export function getTopic({ id, accesstoken }) {
  return get(`/topic/${id}`, {
    mdrender: false,
    accesstoken
  });
}
// 查询话题列表....
export function getTopic({
  tab,
  limit= 5,
  page }) {
  return get(`/topics`,{
    tab,
    limit,
    page})
}
// 收藏话题
export function collectTopics({
  accesstoken,
  topicId
}) {
  return post(`/topic_collect/collect`, {
    accesstoken,
    topic_id: topicId
  })
}

// 取消收藏
export function deCollectTopics({
  accesstoken,
  topicId
}) {
  return post(`/topic_collect/de_collect`, {
    accesstoken,
    topic_id:topicId
  });
}
// 点赞 or not
export function up({
  replyId,accesstoken
}){
  return post(
    `/reply/${replyId}/ups`,
    {
      accesstoken
    }
  )
}
// 查询用户详情
export function getUser() {}

// 查询用户收藏话题
export function getTopicCollect() {}

// 全部标记已读
export function markAll() {}

// 查询个人消息
export function getMessages() {}

// 发布话题
export function publishTopics() {}
