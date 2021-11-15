import React from 'react'
import { Box, Card, CardBody, CardFooter, Heading, Text } from 'grommet'
import { ThumbsUp } from 'react-feather'
import { BetterBounty } from '../../type'
import router from 'next/router'
import { formatTimestamp } from '../../utils/format'
import { useFeedbackLikes } from '../../hooks/query'
import Tags from '../Common/Tags'

function FeedbackCard({
  daoAddress,
  feedback,
}: {
  feedback: BetterBounty
  daoAddress: string
}) {
  const likes = useFeedbackLikes(daoAddress, feedback?.id)
  return (
    <Card
      background="light-1"
      width="300px"
      style={{ borderRadius: 0, boxShadow: 'none' }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/feedback/${feedback.id}`)
      }}
    >
      <CardBody pad="small">
        <Heading level="6" margin="none">
          {feedback.title}
        </Heading>
        <Text size="small">{feedback.description}</Text>
        <Tags tags={feedback?.tags ?? []} />
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'small', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
      >
        <Text size="small">{formatTimestamp(feedback.createdAt)}</Text>
        <Box direction="row" align="center" gap="small">
          <ThumbsUp size={18} />
          <Text size="small">{likes.length}</Text>
        </Box>
      </CardFooter>
    </Card>
  )
}

export default FeedbackCard
