import { ajaxFun } from "./index";

export const postWeixin = async data => await ajaxFun("post", "/weixin/sendmes", data);