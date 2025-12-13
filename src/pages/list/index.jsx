import { useEffect } from "react"

import BackSearchHeader from "./back_searh_header"
import SavedContent from "./saved_content"

const List = ({ mode, onOpenUnderConstruction }) => {
  //+ скролл вверх при переходе на страницу
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <BackSearchHeader
        mode={mode}
        onOpenUnderConstruction={onOpenUnderConstruction}
      />
      <SavedContent
        mode={mode}
        onOpenUnderConstruction={onOpenUnderConstruction}
      />
    </>
  )
}

export default List
