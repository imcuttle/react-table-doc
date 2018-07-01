/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import p from 'prefix-classname'
import { i18n as i } from './i18n'
import marked from './marked'

const c = p('react-table-doc-')
const cn = p('')

function renderType(type) {}

export default class TableDoc extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    data: PropTypes.object.isRequired
  }
  static defaultProps = {}

  renderThead() {
    const { data } = this.props
    return (
      <thead>
        <tr>
          <th />
        </tr>
      </thead>
    )
  }

  renderTbody() {
    const { data } = this.props
    return (
      <tbody>
        <tr>
          <td />
        </tr>
      </tbody>
    )
  }

  render() {
    const { className, data } = this.props
    return (
      <div className={cn(className, c('container'))}>
        <h1 className={c('display-name')}>{data.displayName}</h1>
        <div
          className={c('description')}
          dangerouslySetInnerHTML={{ __html: marked.parse(data.description) }}
        />
        <div className={c('table-wrapper')}>
          <table>
            {this.renderThead()}
            {this.renderTbody()}
          </table>
        </div>
      </div>
    )
  }
}
