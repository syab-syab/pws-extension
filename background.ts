import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
// バックグラウンドでの処理
// いずれもコンテキストメニューで
// -- ドラッグしたワードを登録
// -- 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペーストできるようにする

// useStorageの第二引数は初期値で、すでにstorageに値がある場合は無視されるっぽい
const [wordArr, setWordArr] = useStorage<string>(storageWordKey)
// const [tmpData, setTmpData] = useState<string>("")

// ワード追加(background向けに編集)
const addWordArr = (val: string) => {
  // 配列をコピーしてから
  const tmpArr = JSON.parse(wordArr).slice()
  // 型を整形する
  const tmpWord: Word = {
    id: Date.now(),
    word: val,
    fav: false
  }
  // 値を格納
  tmpArr.push(tmpWord)
  setWordArr(JSON.stringify(tmpArr))
}

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
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "copy") {
    console.log(info.selectionText)
    addWordArr(info.selectionText)
  }
})