import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Storage } from "@plasmohq/storage"
// なぜかエラーが出る↓のTab
import type { Tab } from "@plasmohq/chrome"
 
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


// [TODO]
// ワード貼り付けで
// コンテキストメニューの子要素に
// お気に入り
//    登録ワード
//    登録ワード
//    .....
// 非お気に入り
//    登録ワード
//    登録ワード
//    .....
// というような感じにする
chrome.contextMenus.onClicked.addListener((info, tab: Tab | undefined) => {
  if (info.menuItemId === "copy") {
    console.log("copy")
    // 型を整形する
    const newWord: Word = {
      id: Date.now(),
      word: info.selectionText,
      fav: false
    }
    saveData(newWord)
  } else if (info.menuItemId === "paste" && tab?.id) {
    // console.log("paste")
    // loadData().then((val) => {
    //   console.log(val)
    // })
    // 対象タブでスクリプトを実行
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: modifyInputElement,
      args: ["新しい値"] // 必要に応じて引数を渡す
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error("スクリプト実行エラー:", chrome.runtime.lastError)
      } else {
        console.log("スクリプト実行結果:", results)
      }
    })
  }
})

// ページ内で実行される関数
function modifyInputElement(newValue: string) {
  const activeElement = document.activeElement
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    (activeElement as HTMLInputElement | HTMLTextAreaElement).value = newValue
    console.log("入力欄が変更されました:", newValue)
  } else {
    console.log("アクティブな入力欄が見つかりませんでした")
  }
}