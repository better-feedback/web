import { Box, Markdown, Heading, Anchor } from 'grommet'
import { Edit, MessageSquare } from 'react-feather'
import { useState } from 'react'
import { Issue } from '../../type'
import CommentModal from './CommentModal'

export default function IssueDetail({
  issue,
  isCouncil,
  daoAddress,
  issueId,
  setIsLoading,
}: {
  issue: Issue
  isCouncil: boolean
  daoAddress: string
  issueId: string
  setIsLoading: any
}) {
  const [isCommenting, setIsCommenting] = useState(false)

  return (
    <Box flex="grow" background="white" pad="medium" gap="small">
      <Heading level={2} margin="none">
        {issue?.title}
      </Heading>

      <Markdown>{issue?.description ?? ''}</Markdown>

      <Box direction="row" align="center" justify="end">
        <Anchor
          label=""
          icon={<MessageSquare />}
          onClick={() => {
            setIsCommenting(true)
          }}
        />
        {isCouncil && (
          <Anchor
            icon={<Edit />}
            href={`/dao/${daoAddress}/issue/${issueId}/edit`}
          />
        )}

        {isCommenting && (
          <CommentModal
            daoAddress={daoAddress}
            issue={issue}
            onClose={() => setIsCommenting(false)}
            setIsLoading={setIsLoading}
          />
        )}
      </Box>
    </Box>
  )
}
