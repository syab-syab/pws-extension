import styled from "styled-components"
import pwsImage from "data-base64:~assets/header-icon.png"

// popup, sidepanel, optionsで適宜画面に合わせられるように調整する

export const Wrapper = styled.header`
  background: #003C8D;
  color: white;
`

export const TitleWrapper = styled.div`
  & {
    padding: 2rem 0 2rem;
    width: 30%;
    padding: 0.5em;
    background-color: #184b91;
    margin: 0 auto;
    position: relative;
    text-align: center;
    @media (max-width: 700px) {
      width: 50%;
    }
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


export const Image = styled.img`
  width: 7rem;
  height: 7rem;
`

export const Title = styled.h1`
margin: 1rem 0 0;
font-size: 3rem;
letter-spacing: 1.2rem;
font-weight: 500;
@media (max-width: 700px) {
  letter-spacing: 0.3rem;
}
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