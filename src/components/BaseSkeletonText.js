import { h } from 'vue'
import BaseSkeleton from './BaseSkeleton.vue'

function _getRandomInt (min, max) {
  return Math.ceil(Math.random() * (max - min) + min)
}

export default function (props) {
  const getGapSize = () => {
    if (props['line-height'] && props['font-size']) {
      const _pxToNumber = size => size.replace(/\D+/, '')

      const _calculateGap = (lineHeight, fontSize) => {
        return (lineHeight * fontSize) - fontSize + 'px'
      }

      return _calculateGap(props['line-height'], _pxToNumber(props['font-size']))
    } else {
      return props.gap || '6px'
    }
  }

  const getChildren = Array(props.lines || 1).fill().map(() => {
    return h(BaseSkeleton, {
      height: props['font-size'] || '16px',
      width: props.width || _getRandomInt(70, 100) + '%',
      borderRadius: props.borderRadius || '4px'
    })
  })

  return h(
    'div', {
      style: {
        display: 'grid',
        gap: getGapSize()
      },
      class: ['base-skeleton-text']
    },
    getChildren
  )
}
