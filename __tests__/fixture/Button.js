/**
 * @file Button 组件
 * @author wujun07
 * @owner wujun07:2017-06-27
 *
 */
import React, {Component} from 'react'
import ReactDOM, {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'
import {h, c} from '@befe/utils/wrapper/erp'
import {buffer, isCallable, noop} from '../../common/utils'

import Icon from '@befe/erp-comps/v2/components/Icon'

import style from './style.use.less'

export const BUTTON_TYPE_LIST = ['default', 'primary', 'normal', 'success', 'danger', 'pale', 'bare', 'link']
export const BUTTON_SIZE_LIST = ['default', 'small', 'large', 'x-small']
export const COMP_TYPE_BUTTON = 'button'

/**
 * 是多少 哈哈哈哈
 * ### 666
 * - test
 */
export default class Button extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,

    /**
     * 按钮类型类型 'default' | 'primary' | 'success' | 'danger' | 'normal' | 'pale'
     * default: 'default'
     */
    type: PropTypes.oneOf(BUTTON_TYPE_LIST),

    /**
     * 尺寸 'default' | 'small' | 'x-small' | 'large'
     * 实际没有large，因为规范上没有定义
     * default: 'default'
     */
    size: PropTypes.oneOf(BUTTON_SIZE_LIST),

    /*
     * 图标前缀，仅限于已经收录于Icon的font类型图标
     * default: ''
     * */
    icon: PropTypes.string,

    /*
     * 禁用状态
     * default: false
     * */
    disabled: PropTypes.bool,

    /*
     * loading状态，loading状态是即时的，功能上和disabled一样
     * loading图标的显示是延时的，除非 `loadingSpinDelayInMS` 设为 0
     * default: false
     * */
    loading: PropTypes.bool,

    /*
     * loading图标显示的延时时间，0 为不延时，立即显示
     * default: 300
     * */
    loadingSpinDelayInMS: PropTypes.number,

    /*
     * 点击回调
     * e => console.log('button clicked', e.target.value),
     * */
    onClick: PropTypes.func,

    /*
     * 点击完成后的回调
     * 如果是async action模式，在onClick()返回的promise resolve后触发
     * () => console.log('done'),
     * */
    onClickDone: PropTypes.func,
  }

  static defaultProps = {
    classPrefix: 'erp',
    type: 'default',
    size: 'default',
    icon: '',
    iconSize: 'normal',
    // loading: false,
    loadingSpinDelayInMS: 300,
  }

  static compType = COMP_TYPE_BUTTON

  state = {
    asyncLoading: false,
    showLoading: !!this.props.loading
  }

  showLoadingSpinTimer = buffer(() => {
    this.setState({
      showLoading: true
    })
  }, this.props.loadingSpinDelayInMS)

  componentWillMount() {
    style.use()
  }

  componentWillUnmount() {
    style.unuse()
    this.showLoadingSpinTimer.clear()
  }

  componentDidMount() {
    this.updateLoadingPosition()
  }

  componentDidUpdate() {
    this.updateLoadingPosition()
  }

  componentWillReceiveProps(nextProps) {
    const {loading, loadingSpinDelayInMS} = nextProps
    if (loading !== undefined) {
      if (loading && loadingSpinDelayInMS) {
        this.showLoadingSpinTimer()
      }
      else {
        this.setShowLoading(!!loading)
        // this.showLoadingSpinTimer.clear()
        // this.setState({
        //     showLoading: !!loading
        // })
      }
    }
  }

  render() {
    const {
            classPrefix,   // pick out from props
            style,
            type, size, icon, iconSize, iconStyle, children, className, loading, loadingSpinDelayInMS,
            onClick, onClickDone, disabled, title,
            ...otherButtonNativeProps
          } = this.props

    const compClass = this.compClass

    return h.button({
        className: c(
          className,
          compClass,
          `${compClass}-${type}`,
          `${compClass}-size-${size}`,
          this.state.showLoading && `${compClass}-loading`
        ),
        style,
        onClick: this.handleClick,
        disabled,
        title,
        type: 'button',
        // 其他原生支持的attribute，如onMouseEnter, onMouseLeave等
        // 不支持的在上面pick out
        ...otherButtonNativeProps
      },
      h.span(`${compClass}-text`, {},
        icon ? h(Icon, {
          className: c(
            `${compClass}-icon-font-prefix`,
            !children && 'icon-font-prefix-only'
          ),
          name: icon,
          size: iconSize || 'normal',
          style: iconStyle
        }) : null,
        children,
      ),
      h(Icon, {
        className: `${compClass}-loading-icon`,
        ref: domNode => this.loading = domNode,
        type: 'img',
        spin: 1,
        name: this.loadingIconName
      })
    )
  }

  handleClick = e => {
    const {disabled, loading, onClick, onClickDone} = this.props
    const {asyncLoading} = this.state
    const onDone = isCallable(onClickDone) ? onClickDone : noop
    let ret = null
    if (!disabled && !loading && !asyncLoading && isCallable(onClick)) {
      ret = onClick(e)
      if (ret && ret.then) {
        this.setAsyncLoading(true)
        this.showLoadingSpinTimer()
        ret.then(result => {
          // this.setShowLoading(false)
          // this.setAsyncLoading(false)
          onDone(result)
          this.setShowLoading(false)
          this.setAsyncLoading(false)
          return Promise.resolve(result)
        }, error => {
          this.setShowLoading(false)
          this.setAsyncLoading(false)
          return Promise.reject(error)
        })
      }
      else {
        onDone()
      }
    }
  }

  updateLoadingPosition() {
    const domNodeBtn = findDOMNode(this)
    const domNodeLoading = findDOMNode(this.loading)
    const btnRect = domNodeBtn.getBoundingClientRect()
    const borderWidth = 1
    const iconSize = 16
    domNodeLoading.style.left = (btnRect.width - iconSize) / 2 - borderWidth + 'px'
    domNodeLoading.style.top = (btnRect.height - iconSize) / 2 - borderWidth + 'px'
  }

  setAsyncLoading(loading) {
    this.setState({
      asyncLoading: loading
    })
  }

  setShowLoading(showLoading) {
    this.showLoadingSpinTimer.clear()
    this.setState({
      showLoading
    })
  }

  get compClass() {
    return `${this.props.classPrefix}-btn`
  }

  get loadingIconName() {
    return ['primary', 'success', 'danger'].includes(this.props.type) ? 'dot-spin-loading-white' : 'dot-spin-loading'
  }
}
