import * as React from "react"

const CortanaIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="450 50 300 300" {...props}>
    <path
      fill="#ffcccc" // Light red color (replacing #9adaf6)
      d="M600 350c-82.7 0-150-67.3-150-150S517.3 50 600 50s150 67.3 150 150-67.3 150-150 150m0-260c-60.7 0-110 49.3-110 110s49.3 110 110 110 110-49.3 110-110S660.7 90 600 90"
    />
    <path
      fill="#e60000" // Dark red color (replacing #1c9fe7)
      d="M600 320c-66.2 0-120-53.8-120-120S533.8 80 600 80s120 53.8 120 120-53.8 120-120 120m0-215c-52.4 0-95 42.6-95 95s42.6 95 95 95 95-42.6 95-95-42.6-95-95-95"
    />
  </svg>
)

export default CortanaIcon