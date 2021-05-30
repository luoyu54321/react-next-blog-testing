import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'

const Header = () => {
  const router = useRouter();
  const clickMenu = (href) => {
    router.push(href)
  };

  //TODO: mobile version of header

  const linkConfig = [
    {
      title: 'WORK',
      link: '/work'
    }, {
      title: 'BLOG',
      link: '/post'
    }, {
      title: 'LINK',
      link: '/link'
    }
  ]



  return (
    <HeaderContainer>
      <NavArea>
        <InputContainer>
          {
            linkConfig.map((linkInfor, index) => {
              const { title, link } = linkInfor
              index = index + 1
              return (
                <React.Fragment key={link}>
                  <Input id={`Button-${index}`} type="radio" name="headerLink" defaultChecked={router.pathname === link} />
                  <Button id={`Label-${index}`} for={`Button-${index}`} onClick={() => { clickMenu(link) }}>{title}</Button>
                </React.Fragment>
              )
            })
          }
          <BgColorBlock id="Background-color" />
        </InputContainer>
      </NavArea>
    </HeaderContainer>
  )
}

export default Header;


const BgColorBlock = styled.span`
  position: absolute;
  width: 60px;
  background-color: #ffedf8;
  border-radius: 25px;
  z-index: -1;
  transition: 0.25s ease-out;
  padding: 18px 0px;
  left: 30px;
  top: 28px;
  width: 110px;
`

const Input = styled.input`
  display: none;
`
const InputContainer = styled.div`
    width: 100%;
    padding: 0 10px;
`


const NavArea = styled.div`
    background-color: white;
    display: flex;
    flex-flow: row;
    padding: 10px;
    justify-content: space-around;
    border-radius: 50px;
    box-shadow: 0 0 1px 0 #e8dfe6, 0 6px 12px 0 #ffe9f3;
    padding: 15px 0px;
    z-index: 1;

    input[id="Button-1"] {
    &:checked {
      & ~ label[id="Label-1"]{
        color: #ff1661;
      }
      & ~ span{
        transform: translateX(0%);
        }
      }
    }
    input[id="Button-2"] {
    &:checked {
      & ~ label[id="Label-2"]{
        color: #ff1661;
      }
      & ~ span{
        transform: translateX(calc(105px));
        }
      }
    }
    input[id="Button-3"] {
    &:checked {
      & ~ label[id="Label-3"]{
        color: #ff1661;
      }
      & ~ span{
        transform: translateX(calc(210px));
        width: 98px;
        }
      }
    }

`

const Button = styled.label`
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 14px;
    color: #403c3c;
    padding: 0 30px;
`

const HeaderContainer = styled.div`
    position: relative;
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: #fff8fa;
`