/*
404路由组件
*/

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'antd-mobile'




class NotFound extends Component{
	
	jumpIndex=()=>{
		this.props.history.replace('/')
	}
	
	render(){

		return(
		<div>
			找不到该页面
			<Button type='primary' onClick={this.jumpIndex}>跳转到主页</Button>
		</div>
		)
	}
}

export default connect(
state=>({}),
{}
)(NotFound)