import { useParams } from 'react-router-dom'
import List from '../../../pages/list'
import NotfoundPage from '../../../pages/notfound-page-404'

const ListWrapper = ({
  mode,
  groups,
  onSaveCard,
  onDeleteCard,
  onOpenAddCard,
  onOpenEditCard,
}) => {
  const { groupId } = useParams()
  const group = groups.find((g) => g.id === groupId)
  if (!group) return <NotfoundPage />

  return (
    <List
      mode={mode}
      group={group}
      groupId={groupId}
      onSaveCard={onSaveCard}
      onOpenAddCard={() => onOpenAddCard(groupId)}
      onOpenEditCard={(card) =>
        onOpenEditCard(card, groupId)
      }
      onDeleteCard={(id) => onDeleteCard(id, groupId)}
    />
  )
}

export default ListWrapper
