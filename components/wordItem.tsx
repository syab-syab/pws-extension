// 登録したワードをリストにする
import styled from "styled-components"

const Wrapper = styled.div`
  vertical-align: middle;
  display: block;
  width: 100%;

  @media (max-width: 700px) {
    width: 100%;
  }
`

const Item = styled.div`
  background-color: #D9D9D9;
  display: flex;
  border: 0.3rem black solid;
  border-radius: 0.4rem;

  @media (max-width: 700px) {
    width: auto;
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  margin: 1rem;
  font-size: 3rem;
`

const WordItemDelBtn = styled.div`
  flex-grow: 1;
  border-right: 0.3rem black solid;
`

const favColor: string = `
  background: #f9e42c;
`

const normalColor: string = `
  background: #D9D9D9;
`

// widthを指定しないとoverflow: hidden;が効かない
// anyはbooleanに直す
const WordItemSpace = styled.div<{$isFav?: any}>`
  ${
    props => props.$isFav ? favColor : normalColor
  }
  width: 0;
  height: 4rem;
  overflow: hidden;
  flex-grow: 7;
  font-size: 2rem;
  @media (max-width: 700px) {
    height: auto;
  }
`

const WordItemCopyBtn = styled.div`
  & {
    flex-grow: 1;
    border-left: 0.3rem black solid;    
  }
  &:hover {
    background: white;
  }
  &:active {
    box-shadow: inset 0px 12px 25px 5px rgba(0, 0, 0, 0.4);
  }

`

type Props = {
  // anyの部分は後でWord型に直す
  // key: nmber
  key: any,
  // word: string
  word: any,
  // isFav: boolean
  isFav: any,
  onChangeFav: (id: number) => void,
  onClickCopy: (val: string) => void,
  onClickDel: (id: number) => void,

}

export const WordItem = (props: Props) => {
  return (
    // [TODO]
    // チェックボタンが効かないので後で直す
    <Wrapper key={props.key}>
      <input
        type="checkbox"
        checked={props.isFav}
        onChange={() => props.onChangeFav(props.key)}
      />
      <Item>
        {/* <Tooltip title={<h1>Delete</h1>} arrow> */}
          <WordItemDelBtn onClick={() => props.onClickDel(props.key)}>
            D
            {/* <DeleteIcon fontSize='large' /> */}
          </WordItemDelBtn>                
        {/* </Tooltip> */}
        {/* <Tooltip title={<h1>{props.itemWord}</h1>} arrow> */}
          <WordItemSpace $isFav={props.isFav}>
            {props.word}
          </WordItemSpace>
        {/* </Tooltip> */}
        {/* <Tooltip title={<h1>Copy</h1>} arrow> */}
          <WordItemCopyBtn onClick={() => props.onClickCopy(props.key)}>
            C
            {/* <ContentCopyIcon fontSize='large' /> */}
          </WordItemCopyBtn>
        {/* </Tooltip> */}
      </Item>
    </Wrapper>
  )
}