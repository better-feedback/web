import { Box } from 'grommet'
import { useRouter } from 'next/router'
import IssueList from '../../../components/Issue/List'
import CategoryCount from '../../../components/Common/CategoryCount'
import StatusCount from '../../../components/Common/StatusCount'
import Layout from '../../../components/Layout'
import { useDAOviewMethod } from '../../../hooks/query'
import { DAOMethod, Status } from '../../../type'
import DAOIntro from '../../../components/DAO/Intro'

const DAOPage = () => {
  const { query } = useRouter()
  const daoAddress = query.did as string
  const issues = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssues,
    undefined,
    []
  )
  const categories = useDAOviewMethod(
    daoAddress,
    DAOMethod.getCategories,
    undefined,
    []
  )

  return (
    <Layout title={daoAddress}>
      <Box direction="column" align="center" justify="center">
        <DAOIntro daoAddress={daoAddress} />

        <Box direction="row" wrap align="center" justify="center" width="90%">
          {categories.map((category, index) => {
            return (
              <CategoryCount
                key={index}
                category={category}
                daoAddress={daoAddress}
              />
            )
          })}
          {[Status.Open, Status.Closed].map((status, index) => {
            return (
              <StatusCount
                key={index}
                status={status}
                daoAddress={daoAddress}
              />
            )
          })}
        </Box>

        <Box
          width="1200px"
          direction="row"
          overflow="scroll"
          pad="medium"
          gap="medium"
        >
          <IssueList
            status={Status.Planned}
            issues={issues}
            daoAddress={daoAddress}
          />
          <IssueList
            status={Status.InProgress}
            issues={issues}
            daoAddress={daoAddress}
          />
          <IssueList
            status={Status.Completed}
            issues={issues}
            daoAddress={daoAddress}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
