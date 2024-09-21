import { useState } from 'react'
import axios from 'axios'

import { createClient } from '@sanity/client'

import { useToast } from '@sanity/ui'
import { EyeOpenIcon, BasketIcon, SyncIcon } from '@sanity/icons'
import { 
  useClient, 
  useCurrentUser,
  definePlugin
} from 'sanity'

const sanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'your-dataset',
  useCdn: false, // set to `true` to fetch from edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})

const singletons = [
  'generalSettings',
  'cookieSettings',
  'promoSettings',
  'headerSettings',
  'footerSettings',
  'shopSettings',
  'seoSettings',
]

const editAndDelete = ['product', 'productVariant']

const previews = ['page', 'product', 'collection']

const PreviewAction = (props) => {
  const slug = props.draft
    ? props.draft.slug?.current
    : props.published?.slug?.current

  return {
    label: 'Open Preview',
    icon: EyeOpenIcon,
    onHandle: async () => {
      const localURL = 'http://localhost:3000'
      const remoteURL = await sanityClient.fetch(
        '*[_type == "generalSettings"][0].siteURL'
      )

      const frontendURL =
        window.location.hostname === 'localhost' ? localURL : remoteURL

      window.open(
        `${frontendURL}/api/preview?token=HULL&type=${props.type}&slug=${
          slug || ''
        }`
      )
    },
  }
}

const ShopifyAction = ({ draft, published }) => {
  const [isSyncing, setIsSyncing] = useState(false)

  const toast = useToast()
  const client = useClient()

  return {
    label: isSyncing ? 'Syncing...' : 'Sync images to Shopify',
    icon: isSyncing ? SyncIcon : BasketIcon,
    disabled: draft || !published?.productID,
    title: draft ? 'Must be published first' : null,
    onHandle: async () => {
      setIsSyncing(true)

      toast.push({
        title: 'Beginning Sync...',
      })

      const localURL = 'http://localhost:3000'
      const remoteURL = await client.fetch(
        '*[_type == "generalSettings"][0].siteURL'
      )
      const frontendURL =
        window.location.hostname === 'localhost' ? localURL : remoteURL

      axios({
        url: `${frontendURL}/api/shopify/product-images`,
        method: 'POST',
        data: published,
      })
        .then((res) => res.data)
        .then((res) => {
          setIsSyncing(false)

          if (res.error) {
            toast.push({
              status: 'error',
              title: 'Error',
              description: res.error,
            })
          } else {
            toast.push({
              status: 'success',
              title: "Photos sync'd to Shopify successfully!",
            })
          }
        })
        .catch((err) => {
          setIsSyncing(false)

          toast.push({
            status: 'error',
            title: 'Error!',
            description: 'An unknown error occurred',
          })
        })
    },
  }
}

export const resolveDocumentActions = definePlugin((prev, context) => {
  return (props) => {
    const isSingle = singletons.indexOf(props.schemaType) > -1
    const canEditDelete = editAndDelete.indexOf(props.schemaType) > -1
    const canPreview = previews.indexOf(props.schemaType) > -1
    const isProduct = props.schemaType === 'product'

    const defaultActions = prev(props)

    if (isSingle) {
      return [
        ...defaultActions.filter(
          (action) => 
            action.action === 'publish' || 
            action.action === 'discardChanges'
        ),
        ...(canPreview ? [PreviewAction] : []),
      ]
    }

    if (canEditDelete) {
      return [
        ...defaultActions.filter(
          (action) => 
            action.action === 'publish' || 
            action.action === 'discardChanges' ||
            action.action === 'delete'
        ),
        ...(canPreview ? [PreviewAction] : []),
        ...(isProduct ? [ShopifyAction] : []),
      ]
    }

    return [
      ...defaultActions,
      ...(canPreview ? [PreviewAction] : [])
    ]
  }
})