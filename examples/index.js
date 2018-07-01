/**
 * @file index.js
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */
import * as React from 'react'
import { render } from 'react-dom'
import TableDoc from '../'
import '../lib/style.css'

render(
  <div>
    <TableDoc data={require('../__tests__/fixture/button.json')} />
  </div>,
  window.root
)
