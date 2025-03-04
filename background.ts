// import { useStorage } from "@plasmohq/storage/hook"
import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Storage } from "@plasmohq/storage"
 
const storage = new Storage({
  area: "sync" // "local"はローカル保存、"sync"はクラウド同期
});


// 二つともPromiseオブジェクトなのでどうにか中身を取り出して
// push や JSON.parse などの関数を使いたい
// ローカルデータ読み込み
async function loadData() {
  const value = await storage.get(storageWordKey);
  // 配列をコピーしてから
  // const tmpArr = JSON.parse(value).slice()
  // console.log("保存されたデータ:", value);
  // return tmpArr
  return JSON.parse(value)
}

// ローカルに保存
async function saveData(newWord: Word) {
  const words = loadData()
  words.then((val) => {
    // let tmpArr = JSON.parse(val)
    let tmpArr = val
    tmpArr.push(newWord)
    // storage.setにawaitを付けていないせいかエラー発生
    storage.set(storageWordKey, JSON.stringify(tmpArr))
    console.log("データが保存されました")
  })
  
  // 値を格納
  // JSON.parse(tmpArr).push(tmpWord)
  // await storage.set(storageWordKey, JSON.stringify(tmpArr));
  // console.log("データが保存されました");
}

// バックグラウンドでの処理
// いずれもコンテキストメニューで
// -- ドラッグしたワードを登録
// -- 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペーストできるようにする

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
    // javascriptでinputにペーストする
    loadData().then((val) => {
      // locadData()でもJSON.parse()やってから返してるし二度手間だが
      // こうしないと上手く行かない
      // console.log(JSON.parse(val))
      console.log(val)
    })
  }
})