import { Box, Text, Anchor } from 'grommet'
import { useRouter } from 'next/router'
import Layout from '../../../../../components/Layout'
import Portfolio from '../../../../../components/Issue/Portfolio'
import { useDAOviewMethod } from '../../../../../hooks/query'
import { getDAOName } from '../../../../../utils/common'
import Logs from '../../../../../components/Logs'
import { useMemo, useState } from 'react'
import { useAccount } from '../../../../../hooks/wallet'
import { ChevronRight } from 'react-feather'
import { DAOMethod } from '../../../../../type'
import IssueDetail from '../../../../../components/Issue/Detail'

const DAOPage = () => {
  const account = useAccount()
  const { query } = useRouter()
  const daoAddress = query.did as string
  const issueId = query.bid as string
  const params = useMemo(() => ({ id: Number(issueId) }), [issueId])

  const issue = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssueInfo,
    params,
    null
  )
  const [isLoading, setIsLoading] = useState(false)
  const council = useDAOviewMethod(
    daoAddress,
    DAOMethod.getCouncil,
    undefined,
    []
  )

  let isCouncil = false

  if (issue && council.includes(account?.accountId)) {
    isCouncil = true
  }

  return (
    <Layout title={issue?.title ?? ''} isLoading={isLoading}>
      <Box pad="small" />
      <Box direction="row" align="end" gap="xsmall">
        <Anchor
          label={getDAOName(daoAddress)}
          href={`/dao/${daoAddress}`}
          style={{ fontSize: 30 }}
        />
        <ChevronRight size={20} color="#999" />
        <Text>{issue?.title}</Text>
      </Box>
      <Box
        direction="row"
        align="start"
        justify="between"
        gap="medium"
        pad={{ vertical: 'medium' }}
      >
        {issue && (
          <Portfolio
            issue={issue}
            daoAddress={daoAddress}
            setIsLoading={setIsLoading}
            isCouncil={isCouncil}
          />
        )}

        <Box width="880px">
          <IssueDetail
            daoAddress={daoAddress}
            issueId={issueId}
            issue={issue}
            isCouncil={isCouncil}
            setIsLoading={setIsLoading}
          />

          <Logs
            logs={issue?.logs ?? []}
            likes={issue?.likes ?? []}
            issue={issue}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
