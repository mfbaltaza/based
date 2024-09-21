import React from 'react'
import Link from 'next/link'

const Logo = ({ router, menuDesktop }) => {
  return (
    <div
      className={`sm:m-0 ml-[40px] flex-1 flex ${
        menuDesktop?.positionMenu === 'center '
          ? 'sm:justify-start sm:order-1'
          : menuDesktop?.positionMenu === 'left'
          ? 'sm:justify-center sm:order-2'
          : menuDesktop?.positionMenu === 'right'
          ? 'sm:justify-center sm:order-3'
          : 'sm:justify-start sm:order-1'
      }`}
    >
      {router.pathname === '/' ? (
        <button
          className="clean-btn block bg-transparent"
          aria-label="Go Home"
          onClick={() => window.scrollTo(0, 0)}
        >
          <img
            src="./MAISON-LOGO.png"
            alt="Logo"
            className="h-[40px] sm:h-[72px]"
          />
        </button>
      ) : (
        <Link href="/" scroll={false}>
          <a className="clean-btn block bg-transparent" aria-label="Go Home">
            <img
              src="./MAISON-LOGO.png"
              alt="Logo"
              className="h-[40px] sm:h-[72px]"
            />
          </a>
        </Link>
      )}
    </div>
  )
}

export default Logo
