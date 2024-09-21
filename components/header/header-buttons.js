import React from 'react'
import Icon from '@components/icon'

const HeaderButtons = ({ toggleCart, menuDesktop }) => (
  <div
    className={`z-3 flex flex-1 flex-row items-center justify-end gap-[10px] sm:gap-[20px] ${
      menuDesktop?.positionMenu === 'center'
        ? 'sm:order-3 sm:justify-end'
        : menuDesktop?.positionMenu === 'left'
          ? 'sm:order-2 sm:justify-end'
          : menuDesktop?.positionMenu === 'right'
            ? 'sm:order-1 sm:justify-start'
            : 'sm:order-3 sm:justify-end'
    } `}
  >
    <button className="hover:bg-blue-800 flex h-[36px] w-[36px] items-center rounded-full border bg-transparent p-[7px] sm:h-[50px] sm:w-[50px] sm:p-[9px]">
      <Icon
        name="United-Kingdom"
        viewBox="0 0 32 32"
        className="block w-auto"
        fill="none"
      />
    </button>
    <button className="flex h-[36px] w-[36px] items-center rounded-full border bg-transparent p-[7px] sm:h-[50px] sm:w-[50px] sm:p-[12px]">
      <Icon
        name="User-Header"
        viewBox="0 0 24 24"
        className="block w-auto"
        fill="none"
      />
    </button>
    <button
      onClick={() => toggleCart()}
      className="flex h-[36px] w-[36px] items-center rounded-full border bg-transparent p-[7px] sm:h-[50px] sm:w-[50px] sm:p-[12px]"
    >
      <Icon
        name="Header-Shop"
        viewBox="0 0 20 20"
        className="block w-auto"
        fill="none"
      />
    </button>
  </div>
)

export default HeaderButtons
