import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderContainer>
      <NavArea>
        <LogoLink id="link-1" type="radio">Kiki Luo</LogoLink>
        <Link id="link-2" type="radio">WORK</Link>
        <Link id="link-3" type="radio">BLOG</Link>
        <Link id="link-4" type="radio">ABOUT</Link>
      </NavArea>
    </HeaderContainer>
  )
}

export default Header;

const NavArea = styled.div`
  max-width: 1440px;
  min-width: 600px;
  width: 40%;
  display: flex;
  flex-dorection: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px 30px;
`
const Link = styled.div`
  color: grey;
  margin: 0 20px;
  font-size: 13px;
  letter-spacing: 1px;
  :hover{
    border-bottom:2px black solid;　
  }
`
const LogoLink = styled(Link)`
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
`