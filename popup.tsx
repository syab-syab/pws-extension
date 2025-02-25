import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  // const [data, setData] = useState("")
  // const [data, setData] = useStorage("string-test", "")

  // storageに配列を格納するテスト
  const words =  ["test1", "test2", "test3"]
  const [wordArr, setWordArr] = useStorage<string>("arr", JSON.stringify(words))

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
  // フォームに入力した文字列をpushか何かで空の配列に加える
  // ↑未だテスト段階だからJsonじゃなく配列で良い気がする

  return (
    <div
      style={{
        padding: 16
      }}>
      <h1>Private Word Stockの拡張機能版</h1>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} />
      <hr />
      <p>{data}</p> */}
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
