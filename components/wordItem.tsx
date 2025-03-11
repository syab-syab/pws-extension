// 登録したワードをリストにする
import styled from "styled-components"
// import copyIcon from "data-base64:~assets/copy-64.svg"
import delIcon from "data-base64:~assets/del-64.svg"

const borderPx = "1px"

const borderColor = "#838383"

// 少し丸いので四角くする
// ボーダーは細くする
// 少しデカいので小さくする
// 全体的に細めにする
// コピーのボタンにもホバーで色が変わるようにする
// チェックボックスの位置を工夫する
// 全て完了したら別のファイルを作成してstyled-components無しで同じ物を作り、
// そこでツールチップなどのMUIが使える用ならそっちを使う

const Wrapper = styled.div`
  vertical-align: middle;
  display: block;
  width: 100%;
`

const favColor: string = `
  background: #f9e42c;
`

const normalColor: string = `
  background: #D9D9D9;
`

const Item = styled.div<{$isFav?: boolean}>`
  ${
    props => props.$isFav ? favColor : normalColor
  }
  display: flex;
  border: ${borderPx} ${borderColor} solid;
  width: auto;
  font-size: 30px;
  margin-bottom: 7px;
  font-size: 30px;
  &:hover {
    background: white;
  }
`

const CheckboxWrapper = styled.div`
  flex-grow: 1;
  border-right: ${borderPx} ${borderColor} solid;
  text-align: center;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`

const favScroll: string = `
  scrollbar-color: black #f9e42c;
`

const normalScroll: string = `
  scrollbar-color: black #D9D9D9;
`

// widthを指定しないとoverflow: hidden;が効かない
// anyはbooleanに直す
const WordItemSpace = styled.div<{$isFav?: boolean}>`
  ${
    props => props.$isFav ? favScroll : normalScroll
  }
  width: 0;
  height: 40px;
  overflow-y: scroll;
  scrollbar-width: thin;
  flex-grow: 7;
  font-size: 20px;
  cursor: pointer;
  text-align: center;
  vertical-align: center;
  &:hover {
    scrollbar-color: black white;
  }
`


const WordItemDelBtn = styled.div`
  & {
    flex-grow: 1;
    border-left: ${borderPx} ${borderColor} solid;
    text-align: center;
  }
  &:hover {
    background: white;
  }
  &:active {
    box-shadow: inset 0px 12px 25px 5px rgba(0, 0, 0, 0.4);
  }

`

export const Image = styled.img`
  width: 20px;
  height: 20px;
`



type Props = {
  itemIndex: number,
  word: string,
  isFav: boolean,
  onChangeFav: (id: number) => void,
  changeFavId: number,
  onClickCopy: (val: string) => void,
  onClickDel: (id: number, val: string) => void,
  delId: number
}

// muiはエラーが出てめんどいから
// 別のを使う

export const WordItem = (props: Props) => {
  return (
    // [TODO]
    // チェックボタンが効かないので後で直す
    <Wrapper key={props.itemIndex}>
      <Item $isFav={props.isFav} >
        {/* チェックボックスは後で修正 */}
        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={props.isFav}
            onChange={() => props.onChangeFav(props.changeFavId)}
          />          
        </CheckboxWrapper>

        {/* <WordItemCopyBtn onClick={() => props.onClickCopy(props.word)}>
          <Image src={copyIcon} alt="" />
        </WordItemCopyBtn> */}
        {/* 字数オーバーしたところを「...」にする */}
        {/* それをaタグとかでクリックを促してアラートを仕込む */}
        <WordItemSpace $isFav={props.isFav} onClick={() => props.onClickCopy(props.word)}>
          {props.word}
        </WordItemSpace>
        <WordItemDelBtn onClick={() => props.onClickDel(props.delId, props.word)}>
          <Image src={delIcon} alt="" />
        </WordItemDelBtn>
      </Item>
    </Wrapper>
  )
}