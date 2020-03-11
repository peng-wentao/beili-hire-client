/*
消息列表路由容器组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'


/* 
对对chatMsgs按chat_id进行分组的工具函数
 */
function getLastMsgs(chatMsgs,userid){
	const lastMsgObjs={}
	chatMsgs.forEach(msg=>{
		
		if(msg.to===userid&&!msg.read){
			msg.unReadCount=1
		}else{
			msg.unReadCount=0
		}
		
		const chat_id=msg.chat_id
		let lastMsg=lastMsgObjs[chat_id]
		if(!lastMsg){
			lastMsgObjs[chat_id]=msg
		}else{
			const unReadCount=lastMsg.unReadCount+msg.unReadCount
			if(msg.create_time>lastMsg.create_time){
				lastMsgObjs[chat_id]=msg
			}
			lastMsgObjs[chat_id].unReadCount=unReadCount

		}
	})
	//得到lastMsgs数组
	let lastMsgs=Object.values(lastMsgObjs)
	//对lastMsgs按create_time进行降序排序
	lastMsgs=lastMsgs.sort(function(m1,m2){
		return m2.create_time-m1.create_time
	})
	
	return lastMsgs
}

const Item=List.Item
const Brief=Item.Brief
class Message extends Component{
	
	
	render(){
		const user=this.props.user
		const {users,chatMsgs}=this.props.chat
		//对chatMsgs按chat_id进行分组，每一组存有最改组后一次聊天消息
		const lastMsgs=getLastMsgs(chatMsgs,user._id)
		


		return(
		<div style={{marginTop:50,marginBottom:50}}>
			<List>
				{
					lastMsgs.map(lastMsg=>{
						//获得聊天对象的头像
						const targetHeader=user._id===lastMsg.from?users[lastMsg.to].header:users[lastMsg.from].header
						const targetUsername=user._id===lastMsg.from?users[lastMsg.to].username:users[lastMsg.from].username
						const targetUserId=user._id===lastMsg.from?lastMsg.to:lastMsg.from
						return <Item key={lastMsg.chat_id} onClick={()=>{this.props.history.push(`/chat/${targetUserId}`)}} thumb={require(`../../assets/images/${targetHeader}.png`)} extra={<Badge text={lastMsg.unReadCount}/>} arrow='horizontal'>{lastMsg.content}<Brief>{targetUsername}</Brief></Item>
					})
				}
			</List>
		</div>
		)
	}
}

export default connect(
state=>({user:state.user,chat:state.chat}),
{}
)(Message)