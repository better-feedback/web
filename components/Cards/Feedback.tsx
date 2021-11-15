import React from 'react'
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Grommet,
  Heading,
  Text,
} from 'grommet'
import { Dribbble, ThumbsUp } from 'react-feather'
import { BetterBounty, BetterDAO } from '../../type'
import router from 'next/router'
import { formatTimestamp } from '../../utils/format'

function BountyCard({
  daoAddress,
  feedback,
}: {
  feedback: BetterBounty
  daoAddress: string
}) {
  return (
    <Card
      background="status-unknown"
      width="100%"
      style={{ margin: 10 }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/feedback/${feedback.id}`)
      }}
    >
      <CardBody pad="small">
        <Heading level="3" margin={{ vertical: '0px' }}>
          {feedback.title}
        </Heading>
        <Text>{feedback.description}</Text>
        <Box direction="row" pad={{ top: 'medium' }}>
          {feedback.tags.map((tag) => {
            return (
              <Box
                key={tag}
                background="status-ok"
                pad={{ horizontal: 'small' }}
              >
                <Text>{tag}</Text>
              </Box>
            )
          })}
        </Box>
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
      >
        <Text size="small">{`Created at: ${formatTimestamp(
          feedback.createdAt
        )}`}</Text>
        <Text size="small">
          <ThumbsUp size={18} />
          {/* <Text>{feedback.likes.length}</Text> */}
        </Text>
        {/* <Text size="small">{`Created by: ${bounty.creator}`}</Text> */}
      </CardFooter>
    </Card>
  )
}

export default BountyCard
