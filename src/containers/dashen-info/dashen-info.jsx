import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector.jsx'
import {update} from '../../redux/actions.js'


class DashenInfo extends Component{
	
	state={
		header:'', //头像名称
		post:'',  //求职岗位
		salary:'', //薪资要求
		info:'' //个人介绍
	}
	
	handleChange=(name,val)=>{
		this.setState({[name]:val})
	}
	
	save=()=>{
		this.props.update(this.state)
	}
	
	render(){
		const {header,type}=this.props.user
		if(header){
			const path=type==='laoban'?'/laoban':'/dashen'
			 return <Redirect to={path}/>
		}
		
		return (<div>
					<NavBar>大神信息完善页面</NavBar>
					<HeaderSelector handleChange={this.handleChange}/>
					<InputItem placeholder='请输入求职岗位' onChange={(val)=>{this.handleChange('post',val)}}>求职岗位</InputItem>
					<InputItem placeholder='请输入薪资要求' onChange={(val)=>{this.handleChange('salary',val)}}>薪资要求</InputItem>
					<TextareaItem placeholder='请输入个人介绍' title='个人介绍' rows={3} onChange={(val)=>{this.handleChange('info',val)}}/>
					<Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
				</div>)
	}
}

export default connect(
state=>({user:state.user}),
{update}
)(DashenInfo)
