import { Heading, Box, Button, Image, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import { Plus } from 'react-feather'
import FeedbackList from '../../../components/Feedback/List'
import Layout from '../../../components/Layout'
import { useDao, useDAOviewMethod } from '../../../hooks/query'
import { Status } from '../../../type'
import { getDAOName } from '../../../utils/common'

const DAOPage = () => {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const issues = useDAOviewMethod(daoAddress, 'getIssues', undefined, [])
  const dao = useDao(daoAddress)

  return (
    <Layout title={daoAddress}>
      <Box
        direction="column"
        style={{ width: 1200, margin: '0 auto' }}
        pad={{ vertical: 'medium' }}
      >
        <Box direction="row" align="center" justify="between" width="100%">
          <Box direction="row" align="center">
            {dao && dao.logoUrl && (
              <Image src={dao.logoUrl} alt={daoAddress} height={80} />
            )}
            <Heading margin="none">{getDAOName(daoAddress)}</Heading>
          </Box>

          <Button
            label="Feedback"
            icon={<Plus />}
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
        {/* <FeedbackList
          status={Status.Open}
          issues={issues}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Planned}
          issues={issues}
          daoAddress={daoAddress}
        /> */}
        <FeedbackList
          status={Status.InProgress}
          issues={issues}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Completed}
          issues={issues}
          daoAddress={daoAddress}
        />
        <FeedbackList
          status={Status.Closed}
          issues={issues}
          daoAddress={daoAddress}
        />
      </Box>
    </Layout>
  )
}

export default DAOPage
