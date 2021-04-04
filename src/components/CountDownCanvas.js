import PropTypes from 'prop-types'
import React from 'react'
import Canvas from './Canvas'
import DIGITS from './DIGITS'

function CountDownCanvas (props) {
  const { width, height } = props
  const pointCountX = DIGITS[0][0].length
  const pointCountY = DIGITS[0].length
  const pointCountXColon = DIGITS[10][0].length
  const RADIUS = Math.min(Math.floor(parseInt(height) / (pointCountY * 2)), Math.floor((parseInt(width) - 7) / (12 * pointCountX + 4 * pointCountXColon + 14)))

  const NUM_WIDTH = pointCountX * 2 * RADIUS
  const COLON_WIDTH = pointCountXColon * 2 * RADIUS
  const PADDING = 2 * (RADIUS + 1)

  const current = new Date()

  const count = parseInt(props.count)
  let currentCount = count

  const draw = (ctx) => {
    drawTime(ctx)
  }

  const drawTime = (ctx) => {
    const next = new Date()
    const diff = parseInt((next - current) / 1000)
    if (diff === (count - currentCount) || diff > count) {
      return
    }
    currentCount = count - diff
    ctx.clearRect(0, 0, width, height)
    const { hour, minute, second } = getTimeFromInteger(currentCount)

    const colon = 10

    drawDigit(ctx, 0, 0, parseInt(hour / 10))
    drawDigit(ctx, NUM_WIDTH + PADDING, 0, parseInt(hour % 10))
    drawDigit(ctx, 2 * (NUM_WIDTH + PADDING), 0, colon)

    drawDigit(ctx, 2 * (NUM_WIDTH + PADDING) + COLON_WIDTH + PADDING, 0, parseInt(minute / 10))
    drawDigit(ctx, 3 * (NUM_WIDTH + PADDING) + COLON_WIDTH + PADDING, 0, parseInt(minute % 10))
    drawDigit(ctx, 4 * (NUM_WIDTH + PADDING) + COLON_WIDTH + PADDING, 0, colon)
  
    drawDigit(ctx, 4 * (NUM_WIDTH + PADDING) + 2 * (COLON_WIDTH + PADDING), 0, parseInt(second / 10))
    drawDigit(ctx, 5 * (NUM_WIDTH + PADDING) + 2 * (COLON_WIDTH + PADDING), 0, parseInt(second % 10))
  }

  const drawDigit = (cxt, startX, startY, num) => {
    cxt.fillStyle = 'rgb(0,102,153)'
    for (let i = 0; i < DIGITS[num].length; i++)
      for (let j = 0; j < DIGITS[num][i].length; j++) {
        if (DIGITS[num][i][j] == 1) {
          cxt.beginPath()
          // x = (2j + 1) r
          // y = (2i + 1) r
          cxt.arc(startX + RADIUS * (2 * j + 1), startY + RADIUS * (2 * i + 1), RADIUS, 0, 2 * Math.PI)
          cxt.closePath()
          cxt.fill()
        }
      }
  }

  const getTimeFromInteger = (num) => {
    if (num < 0) {
      return
    }
    const hour = parseInt(num / 3600)
    const minute = parseInt((num - hour * 3600) / 60)
    const second = parseInt(num - hour * 3600 - minute * 60)

    return {
      hour,
      minute,
      second
    }
  }

  return (
    <div className="container">
      <Canvas draw={draw} {...props} />
    </div>
  )
}

CountDownCanvas.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired
}

export default CountDownCanvas
