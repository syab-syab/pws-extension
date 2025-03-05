// クリックしたinputタグの情報をメッセージングでbackgroundへ送る

import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

// window.addEventListener("load", () => {
//   console.log(
//     "コンテンツスクリプト発動！"
//   )
//   document.body.style.background = "pink"
// })

// backgroundへinput情報送信
// 右クリック時にメッセージを送信する例
// plasmoのメッセージングAPIに直す
document.addEventListener("contextmenu", (event) => {

  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  // textareaでもOKにする
  if (target.tagName.toLowerCase() === "input" || "textarea") {
    // const inputInfo = {
    //   value: (target as HTMLInputElement).value,
    //   id: target.id,
    //   name: target.name,
    // typeはテキストじゃないとダメ
    //   type: (target as HTMLInputElement).type
    // }
    const inputInfo = target
    console.log(target.value)

  // バックグラウンドにメッセージを送信
    chrome.runtime.sendMessage({
      action: "inputClicked",
      inputInfo
    }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("メッセージ送信エラー:", chrome.runtime.lastError)
      } else {
        console.log("バックグラウンドからの応答:", response)
        inputInfo.value="成功したぞ"
      }
    })
  }
})