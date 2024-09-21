import React from 'react'
import Menu from '@components/menu'

const DesktopNav = ({ menuDesktop, toggleMegaNav }) => (
  <div className="inset-0 hidden items-center justify-between sm:flex">
    <div className="flex items-center">
      {menuDesktop?.items && (
        <Menu
          items={menuDesktop.items}
          onClick={() => toggleMegaNav(false)}
          useMegaNav
        />
      )}
    </div>
  </div>
)

export default DesktopNav
