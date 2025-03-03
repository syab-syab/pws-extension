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

  // ワード追加
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

  // ワード削除
  const delWord = (id: number) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 取得したid以外の要素で新しい配列をfilterで作る
    const newArr = tmpArr.filter(a => a.id !== id)
    // そしてストレージに格納
    setWordArr(JSON.stringify(newArr))
    // console.log(newArr)
    // alert(`このidは ${id} です。`)
  }

  // お気に入り編集
  const toggleFav = (id: number) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 渡されたidの要素を編集する
    tmpArr.map(v => {
      if (v.id === id) {
        v.fav = !v.fav
      }
    })
    setWordArr(JSON.stringify(tmpArr))
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
      <div>
        {
          JSON.parse(wordArr).map(a => {
            return (
              <div
                key={a.id}
                style={{ background: a.fav ? "#ff7f50" : "#c0c0c0"}}
              >
                <input
                  type="checkbox"
                  checked={a.fav}
                  onChange={() => toggleFav(a.id)}
                />
                {a.word} 
                <button onClick={() => delWord(a.id)}>del</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default IndexSidePanel