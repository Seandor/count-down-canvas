import React from 'react'
import ReactDOM from 'react-dom'
import CountDownCanvas from './components/CountDownCanvas'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

ReactDOM.render(<CountDownCanvas width="1000" height="1000" count="300"/>, document.getElementById('app'))
