import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderContainer>
      <NavArea>
        <InputContainer>
          <Input id="Button-1" type="radio" name="headerLink" />
          <LogoButton for="Button-1">Kiki Luo</LogoButton>
          <Input id="Button-2" type="radio" name="headerLink" />
          <Button for="Button-2">WORK</Button>
          <Input id="Button-3" type="radio" name="headerLink" />
          <Button for="Button-3">BLOG</Button>
          <Input id="Button-4" type="radio" name="headerLink" />
          <Button for="Button-4">ABOUT</Button>
          <BgColorBlock />
        </InputContainer>
      </NavArea>
    </HeaderContainer>
  )
}

export default Header;

const BgColorBlock = styled.span`
  position: absolute;
	height: 20px;
	width: 60px;
	background-color: #ffe9f6;
  border-radius: 25px;
	z-index: 1;
  transition: 0.25s ease-out;
  left: 138px;
  top: 5px;
  padding: 10px 10px;

`

const Input = styled.input`
  display: none;
`
const InputContainer = styled.div`
  position: relative;
`

const NavArea = styled.div`
  max-width: 1440px;
  min-width: 600px;
  width: 40%;
  display: flex;
  flex-dorection: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px 30px;

  input[id="Button-1"] {
    &:checked {
      & ~ span {
			transform: translateX(-145%);
      width: 80px;
      }
		}
  }

  input[id="Button-2"] {
    &:checked {
      & ~ span {
			transform: translateX(0px);
		  }
    }
  }

  input[id="Button-3"] {
    &:checked {
      & ~ span {
			transform: translateX(130%);
			}
    }
  }

  input[id="Button-4"] {
    &:checked {
      & ~ span {
			transform: translateX(243%);
      width: 65px;
			}
    }
  }


`
const Button = styled.label`
  position: relative;
  color: grey;
  margin: 0 20px;
  font-size: 13px;
  letter-spacing: 1px;
  z-index: 2;
  transition: color 0.15s ease-in;
  :hover{
    border-bottom:2px black solid;　
  }
`
const LogoButton = styled(Button)`
  color: black;
  font-weight: 600;
  font-size: 20px;
`

const HeaderContainer = styled.div`
  margin-top: 5px;
  height: 50px;
  background: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: row;
  justify-content: start;
  position: fixed;
  width: 100%;
`