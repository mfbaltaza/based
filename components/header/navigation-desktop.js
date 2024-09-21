import React from 'react'
import Menu from '@components/menu'

const DesktopNav = ({ menuDesktop, toggleMegaNav }) => (
  <div className="hidden sm:flex justify-between items-center inset-0">
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
