import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { localKeyWords } from "~popup"

function OptionsIndex() {
  // storageに配列を格納するテスト
  const words =  ["challenge1", "challenge2", "challenge3"]
  // useStorageの第二引数は初期値で、すでにstorageに値がある場合は無視されるっぽい
  const [wordArr, setWordArr] = useStorage<string>(localKeyWords, JSON.stringify(words))

  const [tmpData, setTmpData] = useState<string>("")

  const addWordArr = (val: string) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 値を格納
    tmpArr.push(val)
    setWordArr(JSON.stringify(tmpArr))
    setTmpData("")
  }

  return (
    <div>
      <h1>Private Word Stockの拡張機能版</h1>
      <hr />
      <input onChange={(e) => setTmpData(e.target.value)} value={tmpData} />
      <br />
      <button onClick={() => addWordArr(tmpData)}>登録</button>
      <ul>
        {
          JSON.parse(wordArr).map(a => {
            return (
              <li key={a}>{a}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default OptionsIndex