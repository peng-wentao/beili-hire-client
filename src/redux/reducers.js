import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,READ_MSG} from './action-types.js'
import {getRedirectTo} from '../util/index.js'
const initUser={
	username:'',//用户名
	type:'',//用户类型
	msg:'',//错误信息
	redirectTo:''//有值就重定向
}

function user(state=initUser,action){
	switch(action.type){
		case AUTH_SUCCESS: 
			const {type,header} =action.data
			return {...initUser, ...action.data, redirectTo:getRedirectTo(type,header)}
		case ERROR_MSG:
			return {...state, msg:action.data}
		case RECEIVE_USER:
			return action.data//data是user
		case RESET_USER:
			return {...initUser,msg:action.data}//data是msg
		default:
			return state
	}
}


const initUserList=[]
//管理userList的reducer
function userList(state=initUserList,action){
	switch(action.type){
		case RECEIVE_USER_LIST:
			return action.data
		default:
			return state
	}
	
}

const initChat={
	users:{}, //包含所有用户的对象
	chatMsgs:[], //当前用户相关msg的数组
	unReadCount:0 //总的未读数量
}
//产生聊天状态的reducer
function chat(state=initChat,action){
	switch(action.type){
		case RECEIVE_MSG_LIST:{
			let {chat,userid}=action.data
			let unReadCount=0
			chat.chatMsgs.forEach(chatMsg=>{
				if(chatMsg.to===userid&&chatMsg.read===false){
					unReadCount+=1
				}
			})
			return {...chat,unReadCount:unReadCount }
		}
		case RECEIVE_MSG:{
			const {chatMsg,userid}=action.data
			const currentChatMsgs=state.chatMsgs
			currentChatMsgs.push(chatMsg)
			let unReadCount=state.unReadCount
			if(chatMsg.to===userid){
				unReadCount+=1
			}
			const currentChat={...state,chatMsgs:currentChatMsgs,unReadCount:unReadCount}
			return currentChat
		}
		case READ_MSG:{
			const {hadRead,chat_id,userid}=action.data
			let {unReadCount,chatMsgs,users}=state
			unReadCount=unReadCount-hadRead
			const newchatMsgs=chatMsgs.map(chatMsg=>{
				const newchatMsg=chatMsg
				if(chatMsg.chat_id===chat_id&&chatMsg.to===userid){
					newchatMsg.read=true
				}
				return newchatMsg
			})
			return {users,chatMsgs:newchatMsgs,unReadCount}
		}
		default:
			return state
	}
}



export default combineReducers({
	user,
	userList,
	chat
})