import fetch from "node-fetch"

function getData() {
    const response = await fetch('https:localhost:3000/test')
    const data = await response.json()
  }
