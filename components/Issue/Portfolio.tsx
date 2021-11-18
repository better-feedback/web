import { Heading, Box, Button, Markdown, Text } from 'grommet'
import { DollarSign, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from '../../hooks/wallet'
import { formatTimestamp } from '../../utils/format'
import { likeFeedback } from '../../utils/contract'
import { useDAOviewMethod } from '../../hooks/query'
import Manage from './Manage'
import StatusLabel from '../Common/Status'
import { toast } from '../../utils/common'
import { ToastType } from '../../type'

const Row = ({ title, value }) => {
  return (
    <Box>
      <Text size="small">{title}</Text>
      {typeof value === 'string' ? <Text>{value}</Text> : value}
    </Box>
  )
}

export default function Portfolio({ issue, daoAddress, setIsLoading }) {
  const account = useAccount()
  const likes = useDAOviewMethod(daoAddress, 'getLikes', { id: issue?.id }, [])
  const council = useDAOviewMethod(daoAddress, 'getCouncil', undefined, [])
  if (!issue) {
    return null
  }

  const onLikeFeedback = () => {
    setIsLoading(true)
    likeFeedback(daoAddress, issue.id)
      .then(() => {
        setIsLoading(false)
        window.location.reload()
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  const isLiked = likes.includes(account?.accountId)
  const isManager = council.includes(account?.accountId)
  return (
    <Box
      direction="column"
      pad="none"
      background="white"
      style={{ flex: '0 0 300px', border: '1px solid #333' }}
    >
      <Box pad="small" gap="small">
        <Row title="Creator" value={issue?.createdBy} />
        <Row
          title="Created at"
          value={issue ? formatTimestamp(issue.createdAt) : ''}
        />
        <Row title="Status" value={<StatusLabel status={issue.status} />} />
        <Row title="Liked" value={likes.length} />
        <Row
          title="Funders"
          value={
            issue?.funds.length ? issue.funds.length : "There's not funder yet"
          }
        />
      </Box>

      <Box direction="row" justify="between">
        <ButtonWrap
          title={isLiked ? 'Liked' : 'Like'}
          background={isLiked ? 'status-unknown' : 'accent-4'}
          onClick={() => {
            if (!isLiked) {
              onLikeFeedback()
            }
          }}
          icon={<ThumbsUp size={20} />}
        />
        <ButtonWrap
          title="Fund"
          background="status-ok"
          onClick={() => {}}
          icon={<DollarSign size={20} />}
        />
      </Box>

      {isManager && (
        <Manage
          status={issue?.status}
          daoAddress={daoAddress}
          feedbackId={issue?.id}
        />
      )}
    </Box>
  )
}
