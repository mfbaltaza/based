import React from 'react'
import FocusTrap from 'focus-trap-react'
import { m } from 'framer-motion'
import Menu from '@components/menu'

const MobileNav = ({
  isMobileNavOpen,
  toggleMobileNav,
  menuMobilePrimary,
  menuMobileSecondary,
}) => (
  <div id="mobile-nav" className="main-navigation--mobile">
    <FocusTrap active={isMobileNavOpen}>
      <div>
        <button
          onClick={() => toggleMobileNav(!isMobileNavOpen)}
          className={`clean-btn absolute inset-y-0 left-0 z-6 bg-transparent sm:hidden ${
            isMobileNavOpen ? 'is-open text-pageText' : ''
          }`}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle Menu"
        >
          <span className="transition-menu relative mx-auto flex w-30 flex-col items-center justify-center">
            <span className="icon-line transition-border linear relative block h-0 w-full border-t delay-200 duration-200"></span>
          </span>
        </button>

        <m.div
          initial="hide"
          animate={isMobileNavOpen ? 'show' : 'hide'}
          variants={{ show: { x: '0%' }, hide: { x: '-100%' } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="menu-mobile fixed left-0 top-0 z-5 flex h-screen w-full max-w-[420px] flex-col bg-pageBG text-pageText"
          style={{
            height: 'calc(var(--vh, 1vh) * 100)',
            willChange: 'transform',
          }}
        >
          <div
            className="mobile-navigation flex flex-1 flex-col overflow-y-scroll px-16 pb-16"
            style={{ paddingTop: `calc(var(--headerHeight, 10rem) + 2.5rem)` }}
          >
            <div className="menu-primary">
              {menuMobilePrimary?.items && (
                <Menu
                  items={menuMobilePrimary.items}
                  onClick={() => toggleMobileNav(false)}
                />
              )}
            </div>
            <div className="menu-secondary">
              {menuMobileSecondary?.items && (
                <Menu
                  items={menuMobileSecondary.items}
                  onClick={() => toggleMobileNav(false)}
                />
              )}
            </div>
          </div>
        </m.div>

        <div
          className={`pointer-events-none fixed inset-0 z-4 bg-black bg-opacity-40 opacity-0 ${
            isMobileNavOpen ? 'pointer-events-auto opacity-100' : ''
          }`}
          onClick={() => toggleMobileNav(false)}
        />
      </div>
    </FocusTrap>
  </div>
)

export default MobileNav
