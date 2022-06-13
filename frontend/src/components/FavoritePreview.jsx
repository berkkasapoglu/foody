import FavoriteItem from "./FavoriteItem"
import { usePreview } from 'react-dnd-multi-backend';

function FavoritePreview() {
  const {display, item, style} = usePreview()
  if (!display) {
    return null
  }
  style["zIndex"] = 10
  return <FavoriteItem favorite={item} style={style} dragged={true} size="xs" />
}
export default FavoritePreview