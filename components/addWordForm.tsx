import styled from "styled-components"

// popup, sidepanel, optionsで適宜画面に合わせられるように調整する

const Wrapper = styled.div`
  background-color: #D9D9D9;
  color: black;
  padding: 20px 20px 1px;
`

const InputSelectWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const TextInput = styled.input`
  background-color: #D9D9D9;
  font-size: 20px;
  height: 20px;
  border: 1px solid black;
  text-align: center;
  padding: 5px 0 5px;
  width: 0;
  flex-grow: 5;
`

const SelectCategory = styled.select`

  background-color: #D9D9D9;
  text-align: center;
  font-size: 20px;

  width: 0;
  flex-grow: 5;
`

const BtnWrapper = styled.div`
  text-align: center;
  margin-top: 2px;
`

const SubscribeBtn = styled.div`
  background-color: #003C8D;
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
`

type Props = {
  onChangeTextArea:  (value: React.SetStateAction<string>) => void,
  textAreaValue: string,
  onChangeSelect: (value: React.SetStateAction<string>) => void,
  onClickSubscribeBtn: (val: string) => void,
  subscribeValue: string
}


export const AddWordForm = (props: Props) => {
  return (
    <Wrapper>
      <InputSelectWrapper>
        <TextInput type="text" onChange={(e) => props.onChangeTextArea(e.target.value)} value={props.textAreaValue} />
        <SelectCategory onChange={(e) => props.onChangeSelect(e.target.value)}>
          <option value="normal">ノーマル</option>
          <option value="fav">お気に入り</option>
        </SelectCategory>
      </InputSelectWrapper>
      <BtnWrapper>
        <SubscribeBtn onClick={() => props.onClickSubscribeBtn(props.subscribeValue)}>
          登録
        </SubscribeBtn>        
      </BtnWrapper>

    </Wrapper>
  )
}