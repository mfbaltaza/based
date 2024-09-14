import { Infinity } from 'phosphor-react'

export default {
  title: 'Sample',
  name: 'sample',
  type: 'object',
  icon: Infinity,
  fields: [
    {
        title: 'Content',
        name: 'content',
        type: 'complexPortableText'
      },
  ],
  preview: {
    select: {
      text: 'content.0.children'
    },
    prepare({ content }) {
      return {
        title: 'Sample',
        subtitle: content && content[0]?.text
      }
    }
  }
}
