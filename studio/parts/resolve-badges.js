import { ShopifyBadge } from '../components/shopify-badge'

export default function resolveBadges(props) {
  const defaultBadges = props.defaultResolve(props)
  
  if (props.published?.wasDeleted) {
    return [...defaultBadges, ShopifyBadge]
  }
  
  return defaultBadges
}