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
console.log('data', require('!../loader!../__tests__/fixture/Icon'))
render(
  <div>
    <TableDoc data={data} />
    <hr/>
    <TableDoc data={require('!../loader!../__tests__/fixture/StatelessBtn')} />
    <hr/>
    <TableDoc data={require('!../loader!../__tests__/fixture/DownloadList.tsx')} />
    <hr/>
    <TableDoc data={require('!../loader!../__tests__/fixture/Icon')} />
  </div>,
  window.root
)
