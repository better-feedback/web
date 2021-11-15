import { Heading, Box, Button, Image, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FeedbackCard from '../../../components/Cards/Feedback'
import Layout from '../../../components/Layout'
import { useDao, useFeedbacks } from '../../../hooks/query'
import { BetterDAO } from '../../../type'

const DAOPage = () => {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const feedbacks = useFeedbacks(daoAddress)
  const dao = useDao(daoAddress)
  console.log('###', dao, feedbacks)

  return (
    <Layout title={daoAddress}>
      <Box direction="column" pad={{ vertical: 'medium' }}>
        <Box direction="row" align="center" justify="between" width="100%">
          <Box direction="row" align="center">
            {dao && dao.logoUrl && (
              <Image src={dao.logoUrl} alt={daoAddress} height={80} />
            )}
            <Heading margin="none">{daoAddress}</Heading>
          </Box>

          <Button
            label="Create a feedback"
            primary
            onClick={() => {
              router.push(`/dao/${daoAddress}/feedback/new`)
            }}
          />
        </Box>
        <Text>{dao?.description && `Intro: ${dao?.description}`}</Text>
      </Box>

      <Box direction="column">
        {feedbacks.map((feedback: any) => {
          return (
            <FeedbackCard
              daoAddress={daoAddress}
              feedback={feedback}
              key={feedback.id}
            />
          )
        })}
      </Box>
    </Layout>
  )
}

export default DAOPage
