import {useRef, useEffect, useState} from 'react'
import './App.css'

function App() {
  const [drawState, setDrawState] = useState({drawing: false})
  const canvas = useRef()
  const pos = useRef({x: 0, y: 0})

  function draw({nativeEvent: event}) {
    if (drawState.drawing) {
      const {layerX, layerY} = event
      const context = canvas.current.getContext('2d')
      context.beginPath()
      context.strokeStyle = '#c0392b'
      context.lineWidth = 1
      context.lineCap = 'round'
      context.moveTo(pos.current.x, pos.current.y)
      context.lineTo(layerX, layerY)
      pos.current.x = layerX
      pos.current.y = layerY
      context.stroke()
    }
  }

  useEffect(() => {
    function onMouseDown(event) {
      const {layerX, layerY} = event
      pos.current.x = layerX
      pos.current.y = layerY
      setDrawState({drawing: true})
    }
    function onMouseUp() {
      setDrawState({drawing: false})
    }
    function resize() {
      const context = canvas.current.getContext('2d')
      context.canvas.width = window.innerWidth
      context.canvas.height = window.innerHeight
    }
    resize()
    canvas.current.addEventListener('mousedown', onMouseDown)
    canvas.current.addEventListener('mouseup', onMouseUp)
    canvas.current.addEventListener('resize', resize)
    return () => {
      canvas.current.removeEventListener('mousedown', onMouseDown)
      canvas.current.removeEventListener('mouseup', onMouseUp)
      canvas.current.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="App">
      <canvas onMouseMove={draw} className="bg-white" ref={canvas} />
    </div>
  );
}

export default App;
