import React from 'react'
import Link from 'next/link'

const Logo = ({ router, menuDesktop }) => {
  return (
    <div
      className={`ml-[40px] flex flex-1 sm:m-0 ${
        menuDesktop?.positionMenu === 'center'
          ? 'sm:order-1 sm:justify-start'
          : menuDesktop?.positionMenu === 'left'
            ? 'sm:order-2 sm:justify-center'
            : menuDesktop?.positionMenu === 'right'
              ? 'sm:order-3 sm:justify-center'
              : 'sm:order-1 sm:justify-start'
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
