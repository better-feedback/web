import React from 'react'
import { Box, Card, CardBody, CardFooter, Heading, Text } from 'grommet'
import { ThumbsUp } from 'react-feather'
import { Issue } from '../../type'
import router from 'next/router'
import { useDAOviewMethod } from '../../hooks/query'
import Tags from '../Common/Tags'

function digestDesc(desc: string) {
  return desc.length > 100 ? desc.substr(0, 100) + '...' : desc
}

function FeedbackCard({
  daoAddress,
  issue,
}: {
  issue: Issue
  daoAddress: string
}) {
  const likes = useDAOviewMethod(daoAddress, 'getLikes', { id: issue?.id }, [])
  return (
    <Card
      background="light-1"
      width="100%"
      style={{ borderRadius: 0, boxShadow: 'none', overflow: 'auto' }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/issue/${issue.id}`)
      }}
    >
      <CardBody pad="small" style={{ minHeight: 'unset', paddingBottom: 0 }}>
        <Heading level="6" margin="none">
          {issue.title}
        </Heading>
        <Text size="small">{digestDesc(issue.description ?? '')}</Text>
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'small', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
        align="center"
      >
        {/* <Text size="small">{formatTimestamp(issue.createdAt)}</Text> */}
        <Tags tags={issue.tags ?? []} />
        <Box direction="row" align="center" gap="small">
          <ThumbsUp size={18} />
          <Text size="small">{likes.length}</Text>
        </Box>
      </CardFooter>
    </Card>
  )
}

export default FeedbackCard
