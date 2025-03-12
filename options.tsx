import { useState, type Key } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Header } from "~components/header"
import { AddWordForm } from "~components/addWordForm"
import { WordItem } from "~components/wordItem"
import { DataTable } from "~components/data-table"

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
  const delWord = (id: number, val: string) => {
    if (confirm(`「${val}」を削除しますか？`)) {
      // 配列をコピーしてから
      const tmpArr = JSON.parse(wordArr).slice()
      // 取得したid以外の要素で新しい配列をfilterで作る
      const newArr = tmpArr.filter(a => a.id !== id)
      // ストレージに格納
      setWordArr(JSON.stringify(newArr))
      alert(`「${val}」を削除しました。`)
    }
  }

  // options, sidepanel共通
  // お気に入り編集
  const toggleFav = (id: number) => {
    console.log("toggleFav")
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
    alert(`「${val}」をコピーしました。`)
  }


  // オプションのみツインカラムする(アドブロックプラスのオプションページみたいな感じ)
  // ヘッダーはやめて左上にロゴとアプリ名を表示する
  // 右側でワードの管理を出来るようにする(スクロールした際に左側が動かないようにする)
  return (
    // display: gridでやった方が良いかも(sidebarとかadとか使えるから)

    <div style={{display: "grid"}}>
      <div style={{gridTemplateColumns: "1fr"}}>
        <Header />
        <AddWordForm
          onChangeTextArea={setTmpData}
          textAreaValue={tmpData}
          onChangeSelect={setPropFav}
          onClickSubscribeBtn={addWordArr}
          subscribeValue={tmpData}
        />
      </div>
      <div style={{gridTemplateColumns: "1fr"}}>
      {/* テーブルに変更する */}
      <DataTable
        wordArr={wordArr}
        onChangeFav={toggleFav}
        onClickCopy={copyWord}
        onClickDel={delWord}
      />
      {/* {
          JSON.parse(wordArr).map((a: Word) => {
            return (
              // 基本二列にする
              <WordItem
                key={a.id}
                itemIndex={a.id}
                word={a.word}
                isFav={a.fav}
                onChangeFav={toggleFav}
                changeFavId={a.id}
                onClickCopy={copyWord}
                onClickDel={delWord}
                delId={a.id}
              />

            )
          })
        } */}
      </div>
    </div>
  )
}

export default OptionsIndex