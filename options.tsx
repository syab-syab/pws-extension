import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Header } from "~components/header"
import { AddWordForm } from "~components/addWordForm"
import { WordItem } from "~components/wordItem"

function OptionsIndex() {

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
    <>
      <Header />
      <AddWordForm
        onChangeTextArea={setTmpData}
        textAreaValue={tmpData}
        onChangeSelect={setPropFav}
        onClickSubscribeBtn={addWordArr}
        subscribeValue={tmpData}
      />
      <div>
      {
          JSON.parse(wordArr).map(a => {
            return (
              // 基本二列にする
              <WordItem
                key={a.id}
                word={a.word}
                isFav={a.fav}
                onChangeFav={toggleFav}
                onClickCopy={copyWord}
                onClickDel={delWord}
              />

            )
          })
        }
      </div>
    </>
  )
}

export default OptionsIndex