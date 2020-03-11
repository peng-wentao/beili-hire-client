import axios from 'axios'
//const baseurl='localhost:4000/'

//注册的接口
export const reqRegister=(user)=>{
	return axios.post('/register',user)
}

//登录的接口
export const reqLogin=({username,password})=>{
	return axios.post('/login',{username,password})
}

//更新用户的接口
export const reqUpdate=(user)=>{
	return axios.post('/update',user)
}

//获取user信息的接口
export const reqUser=()=>{
	return axios.get('/user')
}

//获取用户列表的接口
export const reqUserList=(type)=>{
	return axios({url:'/userlist',methods:'get',params:{type:type}})
}

//获取当前用户聊天消息列表的接口
export const reqChatMsgList=()=>{
	return axios.get('/msglist')
}

//修改消息状态为已读
export const reqReadMsg=(from)=>{
	return axios.post('/readmsg',{from})
}