import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"

function IndexSidePanel() {

  // popup, options, sidepanel共通
  const words = []

  // popup, options, sidepanel共通
  // useStorageの第二引数は初期値で、すでにstorageに値がある場合は無視されるっぽい
  const [wordArr, setWordArr] = useStorage<string>(storageWordKey, JSON.stringify(words))
  const [tmpData, setTmpData] = useState<string>("")
  // お気に入り登録するかどうかは真偽値の方が良いかもしれんがとりあえず
  const [propFav, setPropFav] = useState<string>("normal")

  // popup, options, sidepanel共通
  // ワード追加
  const addWordArr = (val: string) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 型を整形する
    const tmpWord: Word = {
      id: Date.now(),
      word: val,
      fav: propFav === "fav" ? true : false
    }
    // 値を格納
    tmpArr.push(tmpWord)
    setWordArr(JSON.stringify(tmpArr))
    setTmpData("")
    // sidepanelとoptionsは状態の初期化とアラートは不要
  }

  // options, sidepanel共通
  // ワード削除
  const delWord = (id: number) => {
    // 配列をコピーしてから
    const tmpArr = JSON.parse(wordArr).slice()
    // 取得したid以外の要素で新しい配列をfilterで作る
    const newArr = tmpArr.filter(a => a.id !== id)
    // ストレージに格納
    setWordArr(JSON.stringify(newArr))
  }

  // options, sidepanel共通
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

  // コピー関数
  const copyWord = (val: string) => {
    navigator.clipboard.writeText(val)
  }


  // シングルカラム(一列)
  // お気に入りチェックボックスを星かハートにする
  // コピーと削除ボタンはアイコンを使う
  // 保存したワードが長すぎる場合に備えて
  // 長い文は省略して表示して
  // マウスオーバーした時に全文表示
  // ヘッダーをWebアプリ版pwsのような感じにする
  // (ただし、ウクライナの国旗っぽさがあるので色合いは変更する)
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
      <select name="" id="" onChange={(e) => setPropFav(e.target.value)}>
        <option value="normal">普通に登録</option>
        <option value="fav">お気に入り登録</option>
      </select>
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
                <button onClick={() => copyWord(a.word)}>コピー</button> | 
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