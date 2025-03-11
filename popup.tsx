import { useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Header } from "~components/header"
import { AddWordForm } from "~components/addWordForm"

function IndexPopup() {

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
    setPropFav("normal")
    alert(`${val}: ${tmpWord.fav ? "お気に入り" : ""}登録完了`)
  }

  // ローカルに格納するには文字列にする->JSON.stringify()
  // ローカルから取り出すには文字列から解凍する->JSON.parse()

  return (
    // ポップアップの大きさは後ほど修正
    <div style={{width: "340px"}}>
      {/* ポップアップのヘッダーはそこまで大きくなくていい */}
      {/* アイコンを表示しなくてもいいと思う */}
      <Header />
      {/* 追加フォームはもうちょい小さくした方がいいかも */}
      <AddWordForm
        onChangeTextArea={setTmpData}
        textAreaValue={tmpData}
        onChangeSelect={setPropFav}
        onClickSubscribeBtn={addWordArr}
        subscribeValue={tmpData}
      />
    </div>
  )
}

export default IndexPopup
