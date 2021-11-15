import { Heading, Box, Button, Image, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import FeedbackCard from '../../../components/Cards/Feedback'
import FeedbackList from '../../../components/Feedback/List'
import Layout from '../../../components/Layout'
import { useDao, useFeedbacks } from '../../../hooks/query'
import { Status } from '../../../type'

const DAOPage = () => {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const feedbacks = useFeedbacks(daoAddress)
  const dao = useDao(daoAddress)

  return (
    <Layout title={daoAddress} mainWidth="100%">
      <Box
        direction="column"
        style={{ width: 1000, margin: '0 auto' }}
        pad={{ vertical: 'medium' }}
      >
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

      <Box
        direction="row"
        overflow="scroll"
        pad="medium"
        style={{ overflowX: 'scroll' }}
        gap="medium"
      >
        <FeedbackList
          status={Status.UnderReview}
          feedbacks={feedbacks}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Accepted}
          feedbacks={feedbacks}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.InProgress}
          feedbacks={feedbacks}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Completed}
          feedbacks={feedbacks}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Rejected}
          feedbacks={feedbacks}
          daoAddress={daoAddress}
        />
      </Box>
    </Layout>
  )
}

export default DAOPage
