import { Box, Heading } from 'grommet'
import router from 'next/router'
import { Issue } from 'type'
import CategoryLabel from 'components/Common/CategoryLabel'
import StatusLabel from 'components/Common/StatusLabel'

export default function IssueItem({
  issue,
  daoAddress,
}: {
  issue: Issue
  daoAddress: string
}) {
  return (
    <Box
      style={{ border: '1px solid #999', borderRadius: 8 }}
      pad="small"
      gap="small"
      onClick={() => {
        router.push(`/dao/${daoAddress}/issue/${issue.id}`)
      }}
    >
      <Heading level={4} style={{ maxWidth: 'unset', margin: 0 }}>
        {issue.title}
      </Heading>
      <Box direction="row" gap="small">
        <StatusLabel status={issue.status} />
        <CategoryLabel category={issue.category} />
      </Box>
    </Box>
  )
}
