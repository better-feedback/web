import { Box, Heading } from 'grommet'
import { IssueType, Status } from '../../type'
import { getStatusConfig, hexToRGB } from '../../utils/common'
import FeedbackCard from '../Cards/Issue'

export default function FeedbackList({
  status,
  issues,
  daoAddress,
}: {
  status: Status
  issues: IssueType[]
  daoAddress: string
}) {
  const { text, color } = getStatusConfig(status)
  const list = issues.filter((issue) => issue.status === status)
  return (
    <Box
      background={color}
      pad={{ vertical: 'small' }}
      style={{
        minWidth: 'unset',
        maxWidth: 'unset',
        flex: '0 0 360px',
        borderRadius: 8,
      }}
    >
      <Heading
        level={5}
        margin={{ horizontal: 'small', vertical: 'none', bottom: 'small' }}
      >
        {text}
      </Heading>
      <Box gap="xxsmall" style={{ minHeight: 'unset' }}>
        {list.map((issue: any) => {
          return (
            <FeedbackCard
              key={issue.id}
              issue={issue}
              daoAddress={daoAddress}
            />
          )
        })}
      </Box>
    </Box>
  )
}
