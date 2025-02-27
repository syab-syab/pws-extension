import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"

function IndexSidePanel() {
  // storageに配列を格納するテスト
  const words =  [
    {
      id: 1,
      word: "challenge1",
      fav: false
    },
    {
      id: 2,
      word: "challenge2",
      fav: false
    },
    {
      id: 3,
      word: "challenge3",
      fav: false
    },
  ]

  // useStorageの第二引数は初期値で、すでにstorageに値がある場合は無視されるっぽい
  const [wordArr, setWordArr] = useStorage<string>(storageWordKey, JSON.stringify(words))
  const [tmpData, setTmpData] = useState<string>("")

  const addWordArr = (val: string) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 型を整形する
    const tmpWord: Word = {
      id: Date.now(),
      word: val,
      fav: false
    }
    // 値を格納
    tmpArr.push(tmpWord)
    setWordArr(JSON.stringify(tmpArr))
    setTmpData("")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>Private Word Stockの拡張機能版</h1>
      <hr />
      <input onChange={(e) => setTmpData(e.target.value)} value={tmpData} />
      <br />
      <button onClick={() => addWordArr(tmpData)}>登録</button>
      <ul>
        {
          JSON.parse(wordArr).map(a => {
            return (
              <li key={a.id}>{a.word}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default IndexSidePanel