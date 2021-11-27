import React, { useMemo } from 'react'
import { Box, Card, CardBody, CardFooter, Heading, Text } from 'grommet'
import { ChevronsUp, ChevronUp, ThumbsUp } from 'react-feather'
import { DAOMethod, Issue } from 'type'
import router from 'next/router'
import { useDAOviewMethod } from 'hooks/query'
import CategoryLabel from 'components/Common/CategoryLabel'

function digestDesc(desc: string) {
  return desc.length > 100 ? desc.substr(0, 100) + '...' : desc
}

function IssueCard({
  daoAddress,
  issue,
  color,
}: {
  issue: Issue
  daoAddress: string
  color: string
}) {
  const params = useMemo(() => ({ id: issue?.id }), [issue.id])
  const _issue = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssueInfo,
    params,
    null
  )

  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      pad="small"
      gap="small"
      onClick={() => {
        router.push(`/issue/${issue.id}`)
      }}
    >
      <Box direction="row" align="center">
        <Box
          gap="small"
          style={{ borderLeft: `2px solid ${color}`, paddingLeft: 8 }}
        >
          <Heading level="4" margin="none">
            {issue.title}
          </Heading>
          <Box direction="row" gap="small">
            <CategoryLabel category={issue.category} />
            {issue.fundable && (
              <CategoryLabel category="Bounty" background="status-error" />
            )}
          </Box>
        </Box>
      </Box>
      <Box direction="column" align="center">
        <ChevronUp size={18} />
        <Text size="small">{(_issue?.likes || []).length}</Text>
      </Box>
    </Box>
  )
}

export default IssueCard
