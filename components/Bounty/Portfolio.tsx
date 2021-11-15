import { Heading, Box, Button, Markdown, Text } from 'grommet'
import dayjs from 'dayjs'
import { getDAOContract } from '../../utils/wallet'
import { DollarSign, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from '../../hooks/wallet'
import { formatTimestamp } from '../../utils/format'
import { likeFeedback } from '../../utils/contract'

const Row = ({ title, value }) => {
  return (
    <Box>
      <Text size="small">{title}</Text>
      <Text>{value}</Text>
    </Box>
  )
}

export default function Portfolio({ feedback, daoAddress }) {
  const account = useAccount()
  if (!feedback) {
    return null
  }
  const onLikeFeedback = () => {
    likeFeedback(daoAddress, feedback.id)
  }

  const isLiked = false //feedback.likes.includes(account?.accountId)
  return (
    <Box
      direction="column"
      pad="none"
      width="300px"
      style={{ border: '1px solid #333' }}
    >
      <Box pad="small" gap="small">
        <Row title="Creator" value={feedback?.creator} />
        <Row
          title="Created at"
          value={feedback ? formatTimestamp(feedback.createdAt) : ''}
        />
        <Row title="Liked" value={feedback?.likes.length ?? '0'} />
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
    </Box>
  )
}
