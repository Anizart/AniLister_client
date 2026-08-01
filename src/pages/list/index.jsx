import { useEffect, useState } from 'react'

import BackSearchHeader from './back_searh_header'
import SavedContent from './saved_content'

const List = ({
  mode,
  group,
  groupId,
  onDeleteCard,
  onOpenAddCard,
  onOpenEditCard,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0) // скролл вверх при переходе на страницу
    setSearchQuery('')
  }, [groupId])

  return (
    <>
      <BackSearchHeader
        mode={mode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        groupName={group?.title || 'Загрузка...'}
      />
      <SavedContent
        mode={mode}
        group={group}
        searchQuery={searchQuery}
        onDeleteCard={onDeleteCard}
        onOpenAddCard={() =>
          onOpenAddCard(groupId, group.topic)
        }
        onOpenEditCard={(card) =>
          onOpenEditCard(card, groupId)
        }
      />
    </>
  )
}

export default List
