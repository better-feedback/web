import { Box, Markdown, Heading, Anchor } from 'grommet'
import { Edit, MessageSquare } from 'react-feather'
import { useState } from 'react'
import { Issue } from 'type'
import CommentModal from 'components/Modals/CommentModal'
import CategoryLabel from 'components/Common/CategoryLabel'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'

const mdParser = new MarkdownIt()

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

  console.log(issue?.description)

  return (
    <Box flex="grow" background="white" pad="medium" gap="small">
      {issue?.fundable && (
        <CategoryLabel category="Bounty" background="status-error" />
      )}
      <Heading level={2} margin="none">
        {issue?.title}
      </Heading>

      <MdEditor
        renderHTML={(text) => {
          return mdParser.render(text)
        }}
        view={{ menu: false, md: false, html: true }}
        value={issue?.description}
        readOnly
        style={{ border: 0 }}
      />
      {/* <Markdown>{issue?.description ?? ''}</Markdown> */}

      <Box direction="row" align="center" justify="end">
        <Anchor
          label=""
          icon={<MessageSquare />}
          onClick={() => {
            setIsCommenting(true)
          }}
        />
        {isCouncil && (
          <Anchor icon={<Edit />} href={`/issue/${issueId}/edit`} />
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
