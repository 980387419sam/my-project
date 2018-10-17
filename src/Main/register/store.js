import {ajaxFun} from '../../Request'


export const postSendEmail = async data => await ajaxFun("post", "/main/register/sendemail", data);
