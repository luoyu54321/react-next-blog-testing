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
        {
          linkConfig.map((linkInfor, index) => {
            const { title, link } = linkInfor
            index = index + 1
            return (
              <React.Fragment key={link}>
                <Button for={`Button-${index}`} onClick={() => { clickMenu(link) }}>{title}</Button>
              </React.Fragment>
            )
          })
        }
      </NavArea>
    </HeaderContainer>
  )
}

export default Header;

/*
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
*/

const NavArea = styled.div`
    background-color: white;
    display: flex;
    flex-flow: row;
    width: 450px;
    padding: 10px;
    justify-content: space-around;
    border-radius: 50px;
    box-shadow: 0 0 1px 0 #e8dfe6, 0 6px 12px 0 #ffe9f3;
    padding: 15px 0px;
`

const Button = styled.label`
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 14px;
    color: #403c3c;
`

const HeaderContainer = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: #fff8fa;
`