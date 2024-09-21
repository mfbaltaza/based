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
          className={`sm:hidden absolute inset-y-0 left-0 z-6 clean-btn bg-transparent ${
            isMobileNavOpen ? 'text-pageText is-open' : ''
          }`}
          aria-expanded={isMobileNavOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle Menu"
        >
          <span className="relative flex flex-col items-center justify-center mx-auto w-30 transition-menu">
            <span className="icon-line block relative w-full h-0 border-t transition-border duration-200 delay-200 linear"></span>
          </span>
        </button>

        <m.div
          initial="hide"
          animate={isMobileNavOpen ? 'show' : 'hide'}
          variants={{ show: { x: '0%' }, hide: { x: '-100%' } }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="menu-mobile fixed top-0 left-0 w-full max-w-[420px] h-screen z-5 flex flex-col bg-pageBG text-pageText"
          style={{
            height: 'calc(var(--vh, 1vh) * 100)',
            willChange: 'transform',
          }}
        >
          <div
            className="flex-1 flex flex-col overflow-y-scroll px-16 pb-16 mobile-navigation"
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
          className={`fixed inset-0 z-4 bg-black bg-opacity-40 pointer-events-none opacity-0 ${
            isMobileNavOpen ? 'pointer-events-auto opacity-100' : ''
          }`}
          onClick={() => toggleMobileNav(false)}
        />
      </div>
    </FocusTrap>
  </div>
)

export default MobileNav
