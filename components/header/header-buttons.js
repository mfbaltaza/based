import React from 'react'
import Icon from '@components/icon'

const HeaderButtons = ({ toggleCart, menuDesktop }) => (
  <div
    className={`flex flex-row items-center gap-[10px] sm:gap-[20px] z-3 flex-1 justify-end
       ${
         menuDesktop?.positionMenu === 'center '
           ? 'sm:justify-end sm:order-3'
           : menuDesktop?.positionMenu === 'left'
           ? 'sm:justify-end sm:order-2'
           : menuDesktop?.positionMenu === 'right'
           ? 'sm:justify-start sm:order-1'
           : 'sm:justify-end sm:order-3'
       }
      `}
  >
    <button className="hover:bg-blue-800 w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] p-[7px] sm:p-[9px] border rounded-full bg-transparent flex items-center">
      <Icon
        name="United-Kingdom"
        viewBox="0 0 32 32"
        className="block w-auto"
        fill="none"
      />
    </button>
    <button className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] p-[7px] sm:p-[12px] border rounded-full bg-transparent flex items-center">
      <Icon
        name="User-Header"
        viewBox="0 0 24 24"
        className="block w-auto"
        fill="none"
      />
    </button>
    <button
      onClick={() => toggleCart()}
      className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] p-[7px] sm:p-[12px] border rounded-full bg-transparent flex items-center"
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
