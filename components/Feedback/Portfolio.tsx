import { Heading, Box, Button, Markdown, Text } from 'grommet'
import { DollarSign, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from '../../hooks/wallet'
import { formatTimestamp } from '../../utils/format'
import { likeFeedback } from '../../utils/contract'
import { useFeedbackLikes } from '../../hooks/query'
import Manage from './Manage'
import StatusLabel from '../Common/Status'

const Row = ({ title, value }) => {
  return (
    <Box>
      <Text size="small">{title}</Text>
      {typeof value === 'string' ? <Text>{value}</Text> : value}
    </Box>
  )
}

export default function Portfolio({ feedback, daoAddress }) {
  const account = useAccount()
  const likes = useFeedbackLikes(daoAddress, feedback?.id)
  if (!feedback) {
    return null
  }

  const onLikeFeedback = () => {
    likeFeedback(daoAddress, feedback.id)
  }

  const isLiked = likes.includes(account?.accountId)
  return (
    <Box
      direction="column"
      pad="none"
      style={{ flex: '0 0 300px', border: '1px solid #333' }}
    >
      <Box pad="small" gap="small">
        <Row title="Creator" value={feedback?.createdBy} />
        <Row
          title="Created at"
          value={feedback ? formatTimestamp(feedback.createdAt) : ''}
        />
        <Row title="Status" value={<StatusLabel status={feedback.status} />} />
        <Row title="Liked" value={likes.length} />
        <Row
          title="Funders"
          value={
            feedback?.funds.length
              ? feedback.funds.length
              : "There's not funder yet"
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

      <Manage
        status={feedback?.status}
        daoAddress={daoAddress}
        feedbackId={feedback?.id}
      />
    </Box>
  )
}
