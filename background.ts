import type { Word } from "~models/Word"
import { storageWordKey } from "~variables/storageWordKey"
import { Storage } from "@plasmohq/storage"
// なぜかエラーが出る↓のTab
import type { Tab } from "@plasmohq/chrome"
 
const storage = new Storage({
  area: "sync" // "local"はローカル保存、"sync"はクラウド同期
});

// Promiseオブジェクト
// ローカルデータ読み込み
async function loadData() {
  const value = await storage.get(storageWordKey);
  // return JSON.parse(value)
  if (value) {
    return JSON.parse(value)
  } else {
    return []
  }
}

// Promiseオブジェクト
// ローカルに保存
async function saveData(newWord: Word) {
  const words = loadData()
  words.then((val) => {
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
// ドラッグしたワードを登録
// 入力フォームにカーソルを合わせた際にお気に入りにしているワードをペースト

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-word",
    title: "ドラッグしたワードを追加",
    // selectionでドラッグしたときだけコンテキストメニュー表示
    contexts: ["selection"]
  })
  chrome.contextMenus.create({
    id: "save-fav-word",
    parentId: "save-word",
    title: "お気に入りに追加",
    contexts: ["selection"]
  })
  chrome.contextMenus.create({
    id: "save-normal-word",
    parentId: "save-word",
    title: "普通に追加",
    contexts: ["selection"]
  })
  // 子要素でお気に入りのワードを列挙する
  chrome.contextMenus.create({
    id: "paste",
    title: "ワード貼り付け",
    // editableでinput要素にカーソルが合わさった時に発動
    contexts: ["editable"]
  })
  chrome.contextMenus.create({
    id: "fav-paste",
    parentId: "paste",
    title: "お気に入りを貼り付け",
    contexts: ["editable"]
  })
  chrome.contextMenus.create({
    id: "normal-paste",
    parentId: "paste",
    title: "普通の貼り付け",
    contexts: ["editable"]
  })
  loadData().then(val => {
    let tmpArr = val
    tmpArr.map(d => {
      // ここからさらにお気に入りと非お気に入りに分けたいので
      // favの有無で分ける
      if (d.fav === true) {
        chrome.contextMenus.create({
          id: `fav-paste-${d.id}`,
          parentId: "fav-paste",
          title: `${d.word}`,
          contexts: ["editable"]
        })
      } else {
        chrome.contextMenus.create({
          id: `normal-paste-${d.id}`,
          parentId: "normal-paste",
          title: `${d.word}`,
          contexts: ["editable"]
        })
      }
    })
  })
})



// [TODO](優先順)
// 本番環境の準備をする(フォントサイズをremとかに直す、chromeストアの登録をする、一度ローカルのデータを消すかして初期状態で問題がないかを確かめる)
// sidepanelに広告を掲載できるかどうかを試す


// コンテキストメニューのidからwordのidを抜く正規表現1(substringの値は10)
const regexFav = /fav-paste-[0-9]+/g
// コンテキストメニューのidからwordのidを抜く正規表現2(substringの値は13)
const regexNormal = /normal-paste-[0-9]+/g

chrome.contextMenus.onClicked.addListener((info, tab: Tab | undefined) => {
  if (info.menuItemId === "save-fav-word") {
    console.log("save-fav-word")
    // 型を整形する
    const newWord: Word = {
      id: Date.now(),
      word: info.selectionText,
      fav: true
    }
    saveData(newWord)
  } else if(info.menuItemId === "save-normal-word") {
    console.log("save-normal-word")
    // 型を整形する
    const newWord: Word = {
      id: Date.now(),
      word: info.selectionText,
      fav: false
    }
    saveData(newWord)
  } else if (String(info.menuItemId).match(regexFav) && tab?.id) {
    // お気に入り貼り付け
    const wordId = Number(String(info.menuItemId).substring(10))
    loadData().then((val) => {
      const tmpArr = val
      // findを使ってid検索してペーストするワードを特定
      const pasteWord = tmpArr.find(v => v.id == wordId)
      // 対象タブでスクリプトを実行
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: modifyInputElement,
        // ペーストするワードを渡す
        args: [pasteWord.word]
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error("スクリプト実行エラー:", chrome.runtime.lastError)
        } else {
          console.log("スクリプト実行結果:", results)
        }
      })
    })
  } else if (String(info.menuItemId).match(regexNormal) && tab?.id) {
    // 非お気に入り貼り付け
    const wordId = Number(String(info.menuItemId).substring(13))
    loadData().then((val) => {
      const tmpArr = val
      // findを使ってid検索してペーストするワードを特定
      const pasteWord = tmpArr.find(v => v.id == wordId)
      // 対象タブでスクリプトを実行
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: modifyInputElement,
        // ペーストするワードを渡す
        args: [pasteWord.word]
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error("スクリプト実行エラー:", chrome.runtime.lastError)
        } else {
          console.log("スクリプト実行結果:", results)
        }
      })
    })
  }
})

// ページ内で実行される関数
// console.logの部分要らないかも
function modifyInputElement(newValue: string) {
  const activeElement = document.activeElement
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    (activeElement as HTMLInputElement | HTMLTextAreaElement).value = newValue
    console.log("入力欄が変更されました:", newValue)
  } else {
    console.log("アクティブな入力欄が見つかりませんでした")
  }
}