import { useParams } from 'react-router-dom'
import List from '../../../pages/list'
import NotfoundPage from '../../../pages/notfound-page-404'

const ListWrapper = ({ groups, mode, ...props }) => {
  const { groupId } = useParams() // ID из URL
  const group = groups.find((g) => g.id === groupId) // Поиск группы по ID

  if (!group) return <NotfoundPage /> // Если группа не найдена - 404

  return (
    <List
      mode={mode}
      group={group} // Передаю всю информацию о группе
      {...props}
    />
  )
}

export default ListWrapper
