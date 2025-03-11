import styled from "styled-components"
import pwsImage from "data-base64:~assets/header-icon.png"

// popup, sidepanel, optionsで適宜画面に合わせられるように調整する
// popupとsidepanelのみで使用した方が良いかも(その場合ロゴかタイトルのどちらかを非表示にする)

// headerタグよりdivタグの方が良いかも
export const Wrapper = styled.div`
  background: #003C8D;
  color: white;
`

export const TitleWrapper = styled.div`
  & {
    padding: 20px 0 20px;
    width: 50%;
    padding: 5px;
    background-color: #184b91;
    margin: 0 auto;
    position: relative;
    text-align: center;
  }
  &:after {
    position: absolute;
    content: '';
    border-top: 20px solid #4970a6;
    border-right: 20px solid transparent;
    border-left: 20px solid transparent;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`

// floatはやめた方がいいかも
export const Image = styled.img`
  width: 30px;
  height: 30px;
  float: left;
`

export const Title = styled.h1`
margin: 0px 0 0;
font-size: 20px;
letter-spacing: 0px;
font-weight: 500;
`


export const Header = () => {
  return (
    <Wrapper>
      <TitleWrapper>
          <Image src={pwsImage} alt="" />
        <Title>
          Private Word Stock
        </Title>
      </TitleWrapper>
    </Wrapper>
  )
}