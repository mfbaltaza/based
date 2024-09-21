import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRect } from '@reach/rect'
import { isBrowser } from '@lib/helpers'
import { useInView } from 'react-cool-inview'
import { useToggleMegaNav, useToggleCart } from '@lib/context'
import PromoBar from '@components/promo-bar'
import MegaNavigation from '@components/menu-mega-nav'

import HeaderLogo from './header/header-logo'
import MobileNav from './header/navigation-mobile'
import DesktopNav from './header/navigation-desktop'
import HeaderButtons from './header/header-buttons'

const Header = ({ data = {}, isTransparent, onSetup = () => {} }) => {
  const { promo, menuDesktop, menuMobilePrimary, menuMobileSecondary } =
    data || {}

  const toggleCart = useToggleCart()
  const toggleMegaNav = useToggleMegaNav()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const { observe, inView: observerIsVisible } = useInView()
  const headerRef = useRef()
  const headerRect = useRect(headerRef)
  const router = useRouter()

  const toggleMobileNav = (state) => {
    setMobileNavOpen(state)
    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state)
    }
  }

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height)
    }
  }, [headerRect])

  useEffect(() => {
    onSetup({ height: headerHeight })
  }, [headerHeight])

  return (
    <>
      <PromoBar data={promo} />
      <header className="sticky inset-x-0 top-0 z-5">
        <div ref={headerRef} className="relative">
          <div className="relative z-2 h-[72px] bg-pageBG p-[16px] sm:h-[96px] sm:px-[40px] sm:py-[12px]">
            <div className="relative z-3 flex h-full flex-row items-center">
              <HeaderLogo router={router} menuDesktop={menuDesktop} />
              <nav
                className={`main-navigation flex flex-1 ${
                  menuDesktop?.positionMenu === 'center'
                    ? 'sm:order-3 sm:justify-center'
                    : menuDesktop?.positionMenu === 'left'
                      ? 'sm:order-1 sm:justify-start'
                      : menuDesktop?.positionMenu === 'right'
                        ? 'sm:order-3 sm:justify-end'
                        : 'sm:order-2 sm:justify-center'
                }`}
                role="navigation"
              >
                <DesktopNav
                  menuDesktop={menuDesktop}
                  toggleMegaNav={toggleMegaNav}
                />
                <MobileNav
                  isMobileNavOpen={isMobileNavOpen}
                  toggleMobileNav={toggleMobileNav}
                  menuMobilePrimary={menuMobilePrimary}
                  menuMobileSecondary={menuMobileSecondary}
                />
              </nav>
              <HeaderButtons
                toggleCart={toggleCart}
                menuDesktop={menuDesktop}
              />
            </div>
          </div>
          <MegaNavigation
            items={[...(menuDesktop?.items || [])]}
            headerHeight={
              isTransparent && observerIsVisible ? headerHeight : false
            }
          />
        </div>
      </header>
      <span ref={observe} className="header--observer" />
    </>
  )
}

export default Header
