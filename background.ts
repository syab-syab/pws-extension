// import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Storage } from "@plasmohq/storage"
 
const storage = new Storage({
  area: "sync" // "local"はローカル保存、"sync"はクラウド同期
});

// 二つともPromiseオブジェクト
// ローカルデータ読み込み
async function loadData() {
  const value = await storage.get(storageWordKey);
  // 配列をコピーしてから
  // const tmpArr = JSON.parse(value).slice()
  return JSON.parse(value)
}

// ローカルに保存
async function saveData(newWord: Word) {
  const words = loadData()
  words.then((val) => {
    // ここはslice()でコピーした方がいいかも
    let tmpArr = val
    // 新しいワードを追加
    tmpArr.push(newWord)
    // storage.setにawaitを付けていないせいかエラー発生 ← 解決したっぽい
    // localに格納
    storage.set(storageWordKey, JSON.stringify(tmpArr))
    console.log("データが保存されました")
  })
}

// コンテキストメニューで
// ドラッグしたワードを登録(クリア)
// 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペーストできるようにする

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy",
    title: "ドラッグしたワードを追加",
    // selectionでドラッグしたときだけコンテキストメニュー表示
    contexts: ["selection"]
  })
  // [TODO]子要素でお気に入りのワードを列挙する
  chrome.contextMenus.create({
    id: "paste",
    title: "ワード貼り付け",
    // editableでinput要素にカーソルが合わさった時に発動
    contexts: ["editable"]
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "copy") {
    console.log("copy")
    // 型を整形する
    const newWord: Word = {
      id: Date.now(),
      word: info.selectionText,
      fav: false
    }
    saveData(newWord)
  } else if (info.menuItemId === "paste") {
    console.log("paste")
    // [memo]
    // コンテンツスクリプトでinput属性にカーソルを合わせた時にその情報を
    // backgroundにメッセージングで送る
    // そのinputタグのvalueに値を仕込めばペースト完了
    // だと思う
    // ちなみにtypeはtextの他にもsearchやtextareaもあるから
    // それに対応できるようにする
    loadData().then((val) => {
      // loadDataで取得したローカルの情報をvalに代入してある
      console.log(val)
    })
  }
})

// メッセージングテスト
// コンテンツスクリプトからのinput情報
// メッセージリスナーを設定
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "inputClicked") {
    console.log("バックグラウンドで受信した<input>情報:", message.inputInfo)

    // 必要に応じて応答を返す
    sendResponse({ status: "success", received: message.inputInfo })
  }

  // 非同期応答を有効にする場合はtrueを返す
  return true
})