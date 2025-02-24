import { useState } from "react"

function IndexSidePanel() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        Private Word Stockの拡張機能版
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />

    </div>
  )
}

export default IndexSidePanel