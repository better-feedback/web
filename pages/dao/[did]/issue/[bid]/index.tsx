import { Heading, Box, Button, Markdown, Text, Anchor } from 'grommet'
import { useRouter } from 'next/router'
import Layout from '../../../../../components/Layout'
import Portfolio from '../../../../../components/Issue/Portfolio'
import { useDAOviewMethod } from '../../../../../hooks/query'
import { getDAOName, getTagColor } from '../../../../../utils/common'
import Logs from '../../../../../components/Logs'
import { useMemo, useState } from 'react'
import { useAccount } from '../../../../../hooks/wallet'
import { ChevronRight, Edit } from 'react-feather'

const DAOPage = () => {
  const account = useAccount()
  const { query } = useRouter()
  const daoAddress = query.did as string
  const issueId = query.bid as string
  const params = useMemo(() => ({ id: Number(issueId) }), [issueId])

  const issue = useDAOviewMethod(daoAddress, 'getIssue', params, null)
  const logs = useDAOviewMethod(daoAddress, 'getLogs', params, [])
  const [isLoading, setIsLoading] = useState(false)

  let isEditable = false
  if (issue && issue.createdBy === account?.accountId) {
    isEditable = true
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
          />
        )}

        <Box width="880px">
          <Box flex="grow" background="white" pad="medium" gap="small">
            <Heading level={2} margin="none">
              {issue?.title}
            </Heading>

            <Markdown>{issue?.description ?? ''}</Markdown>
            <Box direction="row">
              {(issue?.tags ?? []).map((tag) => (
                <Box
                  key={tag}
                  background={getTagColor(tag)}
                  pad={{ vertical: '4px', horizontal: '10px' }}
                >
                  <Text>{tag}</Text>
                </Box>
              ))}
            </Box>

            <Box direction="row" justify="end">
              {isEditable && (
                <Anchor
                  icon={<Edit />}
                  href={`/dao/${daoAddress}/issue/${issueId}/edit`}
                />
              )}
            </Box>
          </Box>

          <Logs logs={logs} />
        </Box>
      </Box>
    </Layout>
  )
}

export default DAOPage
