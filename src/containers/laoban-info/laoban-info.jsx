import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector.jsx'
import {update} from '../../redux/actions.js'


class LaobanInfo extends Component{
	
	state={
		header:'', //头像名称
		company:'', //所属公司
		post:'',  //招聘岗位
		salary:'', //岗位薪资
		info:'' //职位要求
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
					<NavBar>老板信息完善页面</NavBar>
					<HeaderSelector handleChange={this.handleChange}/>
					<InputItem placeholder='请输入公司名称' onChange={(val)=>{this.handleChange('company',val)}}>公司名称:</InputItem>
					<InputItem placeholder='请输入招聘岗位' onChange={(val)=>{this.handleChange('post',val)}}>招聘职位</InputItem>
					<InputItem placeholder='请输入职位薪资' onChange={(val)=>{this.handleChange('salary',val)}}>职位薪资</InputItem>
					<TextareaItem title='职位要求' rows={3} placeholder='请输入职位要求' onChange={(val)=>{this.handleChange('info',val)}}/>
					<Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
				</div>)
	}
}

export default connect(
state=>({user:state.user}),
{update}
)(LaobanInfo)
