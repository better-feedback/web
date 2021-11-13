import { Heading, Box, Button, Markdown, Text } from 'grommet'
import dayjs from 'dayjs'
import { getDAOContract } from '../../utils/wallet'
import { DollarSign, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from '../../hooks/wallet'
import { formatTimestamp } from '../../utils/format'

const Row = ({ title, value }) => {
  return (
    <Box>
      <Text size="small">{title}</Text>
      <Text>{value}</Text>
    </Box>
  )
}

export default function Portfolio({ bounty, daoId, bountyId }) {
  const account = useAccount()
  if (!bounty) {
    return null
  }
  const likeBounty = () => {
    getDAOContract(daoId).then((contract: any) => {
      contract.like({ id: bountyId }).then((result: any) => {
        console.log(result)
      })
    })
  }

  const isLiked = bounty.likes.includes(account?.accountId)
  return (
    <Box
      direction="column"
      pad="none"
      width="300px"
      style={{ border: '1px solid #333' }}
    >
      <Box pad="small" gap="small">
        <Row title="Creator" value={bounty.creator} />
        <Row
          title="Created at"
          value={bounty ? formatTimestamp(bounty.createdAt) : ''}
        />
        <Row title="Liked" value={bounty.likes.length} />
        <Row
          title="Funders"
          value={
            bounty.funders.length
              ? bounty.funders.length
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
              likeBounty()
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
