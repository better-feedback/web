import { Box, Heading, Text } from 'grommet'
import { Smile } from 'react-feather'
import { IssueType, Status } from 'type'
import { getStatusConfig } from 'utils/common'
import IssueCard from 'components/Cards/Issue'

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
  // const [isSort, setIsSort] = useState(false)
  let list = issues.filter((issue) => issue.status === status)
  // console.log(list)
  // if (isSort) {
  //   list = list.sort((a, b) => a.likes.length - b.likes.length)
  // }
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
        direction="row"
        align="center"
        justify="between"
        background={color}
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      >
        <Heading level={5} margin="none">
          {text}
        </Heading>
        {/* <TrendingUp
          size={20}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsSort(!isSort)}
        /> */}
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
          <Box pad={{ vertical: 'medium' }} align="center" justify="center">
            <Smile size={32} />
            <Text>{"There's no issue"}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
