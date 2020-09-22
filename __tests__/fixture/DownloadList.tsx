/**
 * @file DownloadList react component
 * @author Xinyi Li
 * @date 2018/6/11
 * @description
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import './style.less'
import p from 'prefix-classname'
import cn from 'classnames'
import DirBtnLrg from 'dulife-ui/DirBtnLrg'
// import More from 'comps/More'

import GridLayout from 'dulife-ui/GridLayout'
import '../DownloadSource'

import './style.less'
import DownloadSource from 'dulife-ui/DownloadSource';

const c = p('du-page-download-list-')

export default class DownloadList extends React.Component<any, any> {
  static propTypes = {
    ...GridLayout.propTypes,
    /**
     * 渲染方法
     */
    renderItem: PropTypes.any,
    list: PropTypes.arrayOf(
      PropTypes.string
    ),
    list2: PropTypes.arrayOf(
      PropTypes.shape({
        abc: PropTypes.string
      })
    ),
    colNum: PropTypes.number
  }

  static defaultProps = {
    list: [],
    colNum: '1'
  }

  renderItem = ({ content, ...props }, index) => {
    return <DownloadSource {...props} className={cn(this.props.className)}>{content}</DownloadSource>
  }

  render() {
    return (
      <div className={cn(this.props.className,c('container'))}>
        <GridLayout {...this.props} renderItem={this.renderItem} />
      </div>
    )
  }
}

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//       <li key={number.toString()}>
//         {number}
//       </li>
//     );
//     return (
//       <ul>{listItems}</ul>
//     );
//   }

//   const numbers = [1, 2, 3, 4, 5];
//   ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
//   );
