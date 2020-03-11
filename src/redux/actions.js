import {reqRegister,reqLogin,reqUpdate,reqUser,reqUserList,reqChatMsgList,reqReadMsg} from '../api/index.js'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,READ_MSG} from './action-types.js'
import io from 'socket.io-client'
/* 
包含n个action creator
异步action
同步action
 */

function initIO(dispatch,userid){
	if(!io.socket){
		//连接服务器,得到连接对象
		io.socket=io('ws://localhost:4000')
		//绑定监听
		io.socket.on('receiveMsg',function(chatMsg){
				//console.log(chatMsg)
				//只分发与当前用户相关的同步action
				if(userid===chatMsg.from||userid===chatMsg.to){
					dispatch(receiveMsg(chatMsg,userid))
				}
				
				})
		}
	
}

//异步获取消息列表的工具函数
async function getChatMsgList(dispatch,userid){
	initIO(dispatch,userid)//初始化IO
	const response=await reqChatMsgList()
	const result=response.data
	if(result.code===0){
		dispatch(receiveMsgList(result.data,userid))
	}
}

//修改消息状态为已读的同步action
const readmsg=({hadRead,chat_id,userid})=>{
	return {type:READ_MSG,data:{hadRead,chat_id,userid}}
}


//同步获取消息列表的action
const receiveMsgList=(chat,userid)=>{
	return {type:RECEIVE_MSG_LIST,data:{chat:chat,userid}}
}

//接收一个消息的同步action
const receiveMsg=(chatMsg,userid)=>{
	return {type:RECEIVE_MSG,data:{chatMsg,userid}}
}

//授权成功的同步action
const authSuccess=(user)=>{
	return {type:AUTH_SUCCESS,data:user}
}

//错误提示信息的同步action
const errorMsg=(msg)=>{
	return {type:ERROR_MSG,data:msg}
}

//接受user的同步action
const receiveUser=(user)=>{
	return {type:RECEIVE_USER,data:user}
}

//重置user的同步action
export const resetUser=(msg)=>{
	return {type:RESET_USER,data:msg}
}

//接收userList的同步action
const receiveUserList=(userList)=>{
	return {type:RECEIVE_USER_LIST,data:userList}
}

//注册的异步action
export const register=(user)=>{
	const {username, password, password2, type}=user
	//表单前台验证两次密码是否一致,如果不通过,分发错误信息的action
	if(!username||!password||!password2){
		return errorMsg('用户名和密码必须指定')
	}
	if(password!==password2){
		return errorMsg('2次密码要一致')
	}

	
	//如果表单合法,返回一个发ajax请求的异步action函数
	return  async dispatch=>{
		//发送注册的异步ajax请求
		 const response= await reqRegister({username, password, type})
		 const result= response.data
		 if(result.code===0){//成功,分发授权成功的action
			 dispatch(authSuccess(result.data))
			 //获得userid
			 const userid=result.data._id
			 getChatMsgList(dispatch,userid)//获取当前用户相关消息列表
		 }else{//失败,分发授权失败的action
			 dispatch(errorMsg(result.msg))
		 }
		 
	}
}

//登录的异步action
export const login=(user)=>{
	const {username, password}=user
	//表单前台验证,如果不通过,分发错误信息的action
	if(!username||!password){
		return errorMsg('用户名和密码必须指定')
	}
	//如果表单合法
	return  async dispatch=>{
		//发送注册的异步ajax请求
		 const response= await reqLogin({username,password})
		 const result= response.data
		 if(result.code===0){//成功,分发授权成功的action
			//获取userid
			 const userid=result.data._id
			 getChatMsgList(dispatch,userid)//获取当前用户相关消息列表
			 dispatch(authSuccess(result.data))
		 }else{//失败,分发授权失败的action
			 dispatch(errorMsg(result.msg))
		 }
		 
	}
}

//更新用户的异步acion
export const update=(user)=>{
	return async dispatch=>{
		const response=await reqUpdate(user)
		const result=response.data
		if(result.code===0){
			dispatch(receiveUser(result.data))
		}else{
			dispatch(resetUser(result.msg))
		}
	}
}

//获取用户信息的异步action 
export const getUser=()=>{
	return async dispatch=>{
		const response=await reqUser()
		const result=response.data
		if(result.code===0){
			dispatch(receiveUser(result.data))
			//获取userid
			const userid=result.data._id
			getChatMsgList(dispatch,userid)//获取当前用户相关消息列表
		}else{
			dispatch(resetUser(result.msg))
		}
	}
}

//获取用户列表的异步action
export const getUserList=(type)=>{
	return async dispatch=>{
		const response=await reqUserList(type)
		const result=response.data
		if(result.code===0){
			dispatch(receiveUserList(result.data))
		}
	}
}

//发送消息的异步action
export const sendMsg=({from,to,content})=>{
	return dispatch=>{
		//console.log({from,to,content})
		io.socket.emit('sendMsg',{from,to,content})//发送数据
	}
}

//读消息的异步action 
export const async_readMsg=(from,chat_id,userid)=>{
	return async dispatch=>{
		const response=await reqReadMsg(from)
		const result=response.data
		if(result.code===0){
			const hadRead=result.nModified
			dispatch(readmsg({hadRead,chat_id,userid}))
		}
		
	}
}