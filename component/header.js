import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

const Header = () => {
  const router = useRouter();
  const clickMenu = (href) => {
    router.push(href)
  };

  const linkConfig = [
    {
      title: 'Kiki Luo',
      link: '/',
      main: true
    }, {
      title: 'WORK',
      link: '/work',
      main: false
    }, {
      title: 'BLOG',
      link: '/post',
      main: false
    }, {
      title: 'ABOUT',
      link: '/about',
      main: false
    }
  ]



  return (
    <HeaderContainer>
      <NavArea>
        <InputContainer>
          {
            linkConfig.map((linkInfor, index) => {
              const { title, link, main } = linkInfor
              index = index + 1
              return (
                <React.Fragment key={link}>
                  <Input id={`Button-${index}`} type="radio" name="headerLink" defaultChecked={router.pathname === link} />
                  {
                    main ?
                      <LogoButton for={`Button-${index}`} onClick={() => { clickMenu(link) }}>{title}</LogoButton> :
                      <Button for={`Button-${index}`} onClick={() => { clickMenu(link) }}>{title}</Button>
                  }
                </React.Fragment>
              )
            })
          }
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