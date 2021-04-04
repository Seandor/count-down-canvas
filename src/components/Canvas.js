import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {
  const { draw, ...rest } = props

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    let frameCount = 0
    let animationFrameId

    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas ref={canvasRef} {...rest} />
}

Canvas.propTypes = {
  draw: PropTypes.func.isRequired
}

export default Canvas
