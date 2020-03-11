/*
redux最核心的管理模块
*/
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers.js'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'


export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))