import { useState } from "react"
// import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"

function IndexPopup() {

  // テスト1
  // const storage = new Storage({
  //   area: "sync" // "local"はローカル保存、"sync"はクラウド同期
  // });

  // popup, options, sidepanel共通
  // storageに配列を格納するテスト
  const words = [ 
    {
      id: 1,
      word: "Welcome!",
      fav: false
    },
  ]

  // テスト2
  // await storage.set(storageWordKey, JSON.stringify(words))

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

  // ローカルストレージに値があるかどうかをチェック
  // json配列にwordというキーで配列[]を定義する
  // { id: unix時間(数値), word: フォームで入力したワード(文字列), fav: お気に入り(真偽値) }
  // フォームに入力した文字列をpushか何かで空の配列に加える

  // [TODO]
  // 本番環境でインストールしたての何もstorageに入ってない場合の処理を忘れない
  // -- 多分既に格納されていない場合は空の配列を用意して、そこにpushする必要があるかも
  // お気に入り登録のチェックマークの実装
  // -- チェックの付け外しで真偽値を変える。将来的には星かハートのマークに変えたい
  // 削除ボタン
  // -- 押したら削除する。削除の前に確認を取る。
  //    配列.filter(a => a.id !== "削除ボタンを押したid")
  //    で新しい配列を作って格納
  // バックグラウンドでの処理
  // -- ドラッグしたワードを登録
  // -- 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペーストできるようにする

  return (
    <div
      style={{
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

    </div>
  )
}

export default IndexPopup
