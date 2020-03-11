/*
聊天界面组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,InputItem,List,Grid,Icon} from 'antd-mobile'
import {sendMsg,async_readMsg} from '../../redux/actions.js'
import QueueAnim from 'rc-queue-anim'


const Item=List.Item
class Chat extends Component{
	
	state={
		content:'',
		isShow:false,//是否显示表情网格
	}
	
	componentWillMount(){
		const emojis=['🙂','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😋','😜','🤪','🤑','🤗','🤫','🤔','🤐','😏','😒','🙄','😪','🤢','🤮','🥵','🥶']
		this.emojis=emojis.map(emoji=>({text:emoji}))
	}
	
	componentDidMount(){
		window.scrollTo(0,document.body.scrollHeight)
	}
	
		
	componentDidUpdate(){
		window.scrollTo(0,document.body.scrollHeight)
	}
	
	componentWillUnmount(){
		const from=this.props.match.params.userid
		const userid=this.props.user._id
		const chat_id=[from,userid].sort().join('_')
		this.props.async_readMsg(from,chat_id,userid)
		
	}
	
	toggleEmojis=()=>{
		const isShow=!this.state.isShow
		this.setState({isShow})
		if(isShow){
			setTimeout(()=>{
				window.dispatchEvent(new Event('resize'))
			},0)
		}
	}
	
	handleSend=()=>{
		//收集数据
		const from=this.props.user._id
		const to=this.props.match.params.userid
		const content=this.state.content.trim()
		//发送请求
		this.props.sendMsg({from,to,content})
		//清除数据
		this.setState({content:'',isShow:false})
	}
	
	render(){
		const user=this.props.user
		const {users,chatMsgs}=this.props.chat
		//计算当前的chat_id
		const meId=user._id
		const targetId=this.props.match.params.userid
		const chat_id=[meId,targetId].sort().join('_')
		//过滤chatMsg，只留下与当前聊天对象相关的消息
		const msgs=chatMsgs.filter(chatMsg=>chatMsg.chat_id===chat_id)
		
		return(
		<div>
			<NavBar icon={<Icon type='left' onClick={this.props.history.goBack}/>} className='fix-header'>{users[targetId]?users[targetId].username:null}</NavBar>
			<List style={{marginTop:50,marginBottom:50}}>
				<QueueAnim>
				{
					msgs.map(msg=>{
						if(meId===msg.to){
							return <Item key={msg._id} thumb={users[targetId]?require(`../../assets/images/${users[targetId].header}.png`):null}>{msg.content}</Item>
						}else{
							return <Item key={msg._id} className='chat-me' extra={<img src={require(`../../assets/images/${user.header}.png`)} />}>{msg.content}</Item>
						}
					})
				}
				</QueueAnim>
				
			</List>
			<div className='fix-footer'>
				<InputItem value={this.state.content} onChange={val=>this.setState({content:val})} extra={<span><span onClick={(event)=>{this.toggleEmojis();event.stopPropagation()}}>🙂</span>&nbsp;&nbsp;&nbsp;<span onClick={this.handleSend}>发送&nbsp;&nbsp;</span></span>} ></InputItem>
				{this.state.isShow?<Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true} onClick={(item)=>{this.setState({content:this.state.content+item.text})}}/>:null}
			</div>
		</div>
		)
	}
}

export default connect(
state=>({user:state.user,chat:state.chat}),
{sendMsg,async_readMsg}
)(Chat)