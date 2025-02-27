import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

export const localKeyWords: string =  "private-stock-words-extension"

function IndexPopup() {

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

  // ローカルに格納するには文字列にする->JSON.stringify()
  // ローカルから取り出すには文字列から解凍する->JSON.parse()

  // ローカルストレージに値があるかどうかをチェック
  // json配列にwordというキーで配列[]を定義する
  // { id: unix時間(数値), word: フォームで入力したワード(文字列), fav: お気に入り(真偽値) }
  // const pwsWords = [
  //   {
  //     id: 1,
  //     word: "private-word-stock",
  //     fav: false
  //   }
  // ]
  // フォームに入力した文字列をpushか何かで空の配列に加える
  // ↑未だテスト段階だからJsonじゃなく配列で良い気がする

  return (
    <div
      style={{
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
              <li key={a}>{a}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default IndexPopup
