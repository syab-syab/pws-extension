// optionsで使う予定だけど、場合によってはsidepanelでも使うかも
// 見出しはNo(idではなく連番で1から), favのチェックボックス, 内容, コピーボタン, 削除ボタンの順番
// muiを使えるかどうかテストする

import type { Word } from "~models/Word"
import delIcon from "data-base64:~assets/del-64.svg"
import styled from "styled-components"

const Table = styled.table`
  font-size: 20px;
  border: 1px solid black;
`

const favColor: string = `
  background: #f9e42c;
`

const normalColor: string = `
  background: #D9D9D9;
`

const TrData = styled.tr<{$isFav?: boolean}>`
  ${
    props => props.$isFav ? favColor : normalColor
  }
`

const TdCheckBoxWrapper = styled.td`

`

const TdContentWrapper = styled.td`
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  &:hover {
    box-shadow: inset -5px -5px 10px 0px rgba(255, 255, 255, 0.5), inset 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
    scrollbar-color: black white;
  }
`

const TdDelBtnWrapper = styled.td`
  & {
    text-align: center;
  }
  &:hover {
    box-shadow: inset -5px -5px 10px 0px rgba(255, 255, 255, 0.5), inset 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
  }
  &:active {
    box-shadow: inset 0px 12px 25px 5px rgba(0, 0, 0, 0.4);
  }
`

const Image = styled.img`
  width: 20px;
  height: 20px;
`

type Props = {
  // 格納されているデータ
  wordArr: string
  onChangeFav: (id: number) => void,
  onClickCopy: (val: string) => void,
  onClickDel: (id: number, val: string) => void,
}

export const DataTable = (props: Props) => {

  // 集計用のデータを出したいから
  const localWordData = JSON.parse(props.wordArr)

  return (
    <Table>
      {/* この部分に総データ数とかを表示しても良いかも */}
      <thead>
        <tr>
          {/* <th scope="col" style={{ border: "1px solid black" }}>fav</th> */}
          <th scope="col">content</th>
          {/* <th scope="col">del</th> */}
        </tr>
      </thead>

      <tbody>
      {
        localWordData.map((a: Word) => {
          return (
          <TrData key={a.id} $isFav={a.fav}>
            {/* チェックボックス */}
            <TdCheckBoxWrapper>
              <input
                type="checkbox"
                checked={a.fav}
                onChange={() => props.onChangeFav(a.id)}
              />
            </TdCheckBoxWrapper>

            {/* 内容 */}
            <TdContentWrapper onClick={() => props.onClickCopy(a.word)}>
              {a.word}
            </TdContentWrapper>

            {/* 削除ボタン */}
            <TdDelBtnWrapper onClick={() => props.onClickDel(a.id, a.word)}>
              <Image src={delIcon} alt="" />
            </TdDelBtnWrapper>
          </TrData>
          )
        })
      }


        
      </tbody>
    </Table>
  )
}