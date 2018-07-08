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

const data = require('!../loader!../__tests__/fixture/Button.js')
console.log('data', data)
render(
  <div>
    <TableDoc data={data} />
    <hr/>
    <TableDoc data={require('!../loader!../__tests__/fixture/StatelessBtn')} />
  </div>,
  window.root
)
