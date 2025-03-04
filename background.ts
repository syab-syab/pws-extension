// import { useStorage } from "@plasmohq/storage/hook"
// import type { Word } from "~models/Word"
// import { storageWordKey } from "~variables/storageWordKey"
// バックグラウンドでの処理
// いずれもコンテキストメニューで
// -- ドラッグしたワードを登録
// -- 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペーストできるようにする

// useStorageの第二引数は初期値で、すでにstorageに値がある場合は無視されるっぽい
// const [wordArr, setWordArr] = useStorage<string>(storageWordKey)

// ワード追加(background向けに編集)
// const addWordArr = (val: string) => {
//   const tmpArr = JSON.parse(wordArr).slice()
//   const tmpWord: Word = {
//     id: Date.now(),
//     word: val,
//     fav: false
//   }
//   tmpArr.push(tmpWord)
//   setWordArr(JSON.stringify(tmpArr))
// }

// エラー発生
// コンテキストメニューが表示されない
// useStorageを使うと不具合？

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy",
    title: "ドラッグしたワードを追加",
    // selectionでドラッグしたときだけコンテキストメニュー表示
    // contexts: ["all"]
    contexts: ["selection"]
  })
  // 子要素でお気に入りのワードを列挙する
  chrome.contextMenus.create({
    id: "paste",
    title: "ワード貼り付け",
    // editableでinput要素にカーソルが合わさった時に発動
    contexts: ["editable"]
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "copy") {
    console.log(info.selectionText)
    // addWordArr(info.selectionText)
  } else if (info.menuItemId === "paste") {
    console.log("ペーストテスト")
  }
})