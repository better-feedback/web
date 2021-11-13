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
import dayjs from 'dayjs'
import router from 'next/router'
import { formatTimestamp } from '../../utils/format'

function BountyCard({ dao, bounty }: { bounty: BetterBounty; dao: BetterDAO }) {
  return (
    <Card
      background="status-unknown"
      width="100%"
      style={{ margin: 10 }}
      onClick={() => {
        router.push(`/dao/${dao?.name}/bounty/${bounty.id}`)
      }}
    >
      <CardBody pad="small">
        <Heading level="3" margin={{ vertical: '0px' }}>
          {bounty.title}
        </Heading>
        <Text>{bounty.description}</Text>
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
      >
        <Text size="small">{`Created at: ${formatTimestamp(
          bounty.createdAt
        )}`}</Text>
        <Text size="small">
          <ThumbsUp size={18} />
          <Text>{bounty.likes.length}</Text>
        </Text>
        <Text size="small">{`Created by: ${bounty.creator}`}</Text>
      </CardFooter>
    </Card>
  )
}

export default BountyCard
