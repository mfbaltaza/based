import React from 'react'

import BlockContent from '@components/block-content'

const Marquee = ({ data = {} }) => {
  const { content } = data

  return (
    <div>
      {content && (
        <div className="hero--overlay bg-black">
          <div className="hero--content font-bold">
            <BlockContent blocks={content} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Marquee
