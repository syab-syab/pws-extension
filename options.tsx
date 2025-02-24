import { useState } from "react"

function OptionsIndex() {
  const [data, setData] = useState("")

  return (
    <div>
      <h1>
      Private Word Stockの拡張機能版
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />
    </div>
  )
}

export default OptionsIndex