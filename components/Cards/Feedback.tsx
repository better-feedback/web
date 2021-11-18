import React from 'react'
import { Box, Card, CardBody, CardFooter, Heading, Text } from 'grommet'
import { ThumbsUp } from 'react-feather'
import { BetterBounty } from '../../type'
import router from 'next/router'
import { useDAOviewMethod } from '../../hooks/query'
import Tags from '../Common/Tags'

function digestDesc(desc: string) {
  return desc.length > 100 ? desc.substr(0, 100) + '...' : desc
}

function FeedbackCard({
  daoAddress,
  feedback,
}: {
  feedback: BetterBounty
  daoAddress: string
}) {
  const likes = useDAOviewMethod(
    daoAddress,
    'getLikes',
    { id: feedback?.id },
    []
  )
  return (
    <Card
      background="light-1"
      width="100%"
      style={{ borderRadius: 0, boxShadow: 'none', overflow: 'auto' }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/feedback/${feedback.id}`)
      }}
    >
      <CardBody pad="small" style={{ minHeight: 'unset', paddingBottom: 0 }}>
        <Heading level="6" margin="none">
          {feedback.title}
        </Heading>
        <Text size="small">{digestDesc(feedback.description ?? '')}</Text>
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'small', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
        align="center"
      >
        {/* <Text size="small">{formatTimestamp(feedback.createdAt)}</Text> */}
        <Tags tags={feedback.tags ?? []} />
        <Box direction="row" align="center" gap="small">
          <ThumbsUp size={18} />
          <Text size="small">{likes.length}</Text>
        </Box>
      </CardFooter>
    </Card>
  )
}

export default FeedbackCard
