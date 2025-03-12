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

const Caption = styled.caption`
  text-align: center;
  border: 1px solid black;
  font-size: 25px;
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

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`

const TdContentWrapper = styled.td`

  cursor: pointer;
  text-align: center;
  &:hover {
    box-shadow: inset -5px -5px 10px 0px rgba(255, 255, 255, 0.5), inset 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
    scrollbar-color: black white;
  }
`

// height, widthは間に合わせ
const DivContentWrapper = styled.div`
  height: 45px;
  width: 300px;
  overflow: hidden;
  overflow-x: scroll;
  scrollbar-width: thin;
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

  // お気に入りを降順、昇順で並び替えるボタンを実装する

  return (
    <Table>
      {/* この部分に総データ数とかを表示しても良いかも */}
      <Caption>
      {/* <Thead> */}
        {/* <TrThead> */}
          {/* <ThThead> */}
            現在保管中のワード: {localWordData.length}
          {/* </ThThead> */}
        {/* </TrThead> */}
      {/* </Thead> */}
      </Caption>

      <tbody>
      {
        localWordData.map((a: Word) => {
          return (
          <TrData key={a.id} $isFav={a.fav}>
            {/* チェックボックス */}
            <TdCheckBoxWrapper>
              <Checkbox
                type="checkbox"
                checked={a.fav}
                onChange={() => props.onChangeFav(a.id)}
              />
            </TdCheckBoxWrapper>

            {/* 内容 */}
            <TdContentWrapper onClick={() => props.onClickCopy(a.word)}>
              <DivContentWrapper>
                {a.word}
              </DivContentWrapper>
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