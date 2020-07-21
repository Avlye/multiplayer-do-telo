// Loads global stylesheet
import "./scss/main.scss"

const screen = <HTMLCanvasElement> document.getElementById('screen')
const context = screen.getContext('2d')

const color = 'red'
const positionX = 0
const positionY = 0

const width = 250
const height = 250

context.fillStyle = color
context.fillRect(positionX, positionY, width, height)
