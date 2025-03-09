import styled from "styled-components"

const Wrapper = styled.div`
  background-color: #D9D9D9;
  color: black;
  padding: 2rem 2rem 2rem;
  @media (max-width: 1000px) {
    width: 70%;
  }
  @media (max-width: 800px) {
    width: 80%;
  }
  @media (max-width: 700px) {
    width: 90%;
  }
  @media (max-width: 500px) {
    width: 95%;
    padding: 3rem 1rem 4rem;
}
`

const TextArea = styled.textarea`
  appearance: auto;
  background-color: #D9D9D9;
  width: 100%;
  font-size: 2rem;
  height: 2rem;
  resize: none;
  border: 0.1rem solid black;
`

const SelectCategory = styled.select`
  background-color: #D9D9D9;
  font-size: 2rem;
  width: 100%;
  @media (max-width: 700px) {
    width: 100%;

    margin-bottom: 2rem;
  }
`

type Props = {
  onChangeTextArea:  (value: React.SetStateAction<string>) => void,
  textAreaValue: string,
  onChangeSelect: (value: React.SetStateAction<string>) => void
}


export const AddWordForm = (props: Props) => {
  return (
    <Wrapper>
      <TextArea onChange={(e) => props.onChangeTextArea(e.target.value)} value={props.textAreaValue} />
      <SelectCategory onChange={(e) => props.onChangeSelect(e.target.value)}>
        <option value="normal">普通に登録</option>
        <option value="fav">お気に入り登録</option>
      </SelectCategory>
    </Wrapper>
  )
}