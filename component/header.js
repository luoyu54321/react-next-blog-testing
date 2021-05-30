import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import Image from 'next/image'

const Header = () => {
  const router = useRouter();
  const clickMenu = (href) => {
    router.push(href)
  };

  //TODO: env file to handle path

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
    <Navcolor>
      <HeaderContainer>
        <Image
          src="/react-next-blog-with-tracking-test/kk-logo.svg"
          alt="kkluo blog logo"
          width={170}
          height={50}
        />
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
            <BgColorBlock id="Background-color">
              <Icon>L</Icon>
            </BgColorBlock>
          </InputContainer>
        </NavArea>
      </HeaderContainer>
    </Navcolor>
  )
}


export default Header;

const Icon = styled.div`
position: absolute;
    top: 8px;
    left: 8px;
    background-color: #ff6a00;
    color: white;
    border-radius: 50px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 18px;
    transform: rotate(45deg) scaleX(-1);
    font-weight: 700;
`

const Navcolor = styled.div`
    background-color: #f7f8f9;
`

const BgColorBlock = styled.span`
  position: absolute;
  width: 60px;
  background-color: #f5f5f5;
  border-radius: 25px;
  z-index: -1;
  transition: 0.25s ease-out;
  padding: 18px 0px;
  left: 10px;
  top: 8px;
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
    box-shadow: 0 0 1px 0 #dfe2e8, 0 6px 12px 0 #edf0f5;
    padding: 15px 0px;
    z-index: 1;
    position: relative;

    label[id="Label-1"]{
        padding-left:40px;
    }

    label[id="Label-3"]{
        padding-right:30px;
        padding-left:35px;
    }

    input[id="Button-1"] {
    &:checked {
      & ~ label[id="Label-1"]{
        color: #ff6a00;
      }
      & ~ span{
        transform: translateX(0%);
        }
      }
    }
    input[id="Button-2"] {
    &:checked {
      & ~ label[id="Label-2"]{
        color: #ff6a00;
      }
      & ~ span{
        transform: translateX(calc(110px));
        }
      }
    }
    input[id="Button-3"] {
    &:checked {
      & ~ label[id="Label-3"]{
        color: #ff6a00;
      }
      & ~ span{
        transform: translateX(calc(220px));
        width: 113px;
        }
      }
    }

`

const Button = styled.label`
    font-weight: 500;
    letter-spacing: 1px;
    font-size: 14px;
    color: #403c3c;
    padding: 0 35px 0 30px;
`

const HeaderContainer = styled.div`
    position: relative;
    max-width: 800px;
    margin: auto;
    padding: 30px 30px 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`

//600以下是手機版