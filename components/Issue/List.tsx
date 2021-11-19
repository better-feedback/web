import { Box, Heading, Text } from 'grommet'
import { Smile } from 'react-feather'
import { IssueType, Status } from '../../type'
import { getStatusConfig, hexToRGB } from '../../utils/common'
import IssueCard from '../Cards/Issue'

export default function IssueList({
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
      style={{
        minWidth: 'unset',
        maxWidth: 'unset',
        flex: '0 0 360px',
        borderRadius: 8,
      }}
    >
      <Box
        background={color}
        pad={{ vertical: 'xsmall' }}
        style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <Heading level={5} margin={{ horizontal: 'small', vertical: 'none' }}>
          {text}
        </Heading>
      </Box>
      <Box gap="xxsmall" background="white" style={{ minHeight: 'unset' }}>
        {list.map((issue: any) => {
          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              daoAddress={daoAddress}
              color={color}
            />
          )
        })}
        {list.length === 0 && (
          <Box pad="small" align="center" justify="center">
            <Smile size={32} />
            <Text>{"There's no issue"}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
