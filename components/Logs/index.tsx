import { Anchor, Box, Heading, Text, Tab, Tabs, Stack } from 'grommet'
import _ from 'lodash'
import { DollarSign, Heart, Info, MessageSquare, ThumbsUp } from 'react-feather'
import { Issue, Log, LogType } from '../../type'
import { formatTimestamp } from '../../utils/format'
import StatusLabel from '../Common/StatusLabel'
import IssueLog from './IssueLog'

const RichTabTitle = ({ icon, label, count }) => (
  <Stack anchor="top-right">
    <Box direction="row" align="center" gap="xsmall" margin="xsmall">
      {icon}
      <Text size="small">
        <strong>{label}</strong>
      </Text>
    </Box>
    <Box
      background="status-unknown"
      pad={{ horizontal: 'xsmall' }}
      round
      style={{ position: 'relative', right: -16 }}
    >
      <Text size="small">{count}</Text>
    </Box>
  </Stack>
)

export default function Logs({
  logs,
  likes,
  issue,
}: {
  logs: Log[]
  likes: string[]
  issue: Issue
}) {
  const statusLogs = logs.filter((l) => l.logType === LogType.Status)
  const commentLogs = logs.filter((l) => l.logType === LogType.Comment)
  const fundLogs = logs.filter((l) => l.logType === LogType.Fund)

  return (
    <Box background="white" pad="medium" margin={{ top: 'medium' }}>
      <Tabs justify="start" alignControls="start">
        <Tab
          title={
            <RichTabTitle
              icon={<ThumbsUp />}
              label="Likes"
              count={likes.length}
            />
          }
        >
          <Box pad="small" gap="xsmall">
            {likes.map((like) => (
              <Box key={like}>
                <Text>{like}</Text>
              </Box>
            ))}
          </Box>
        </Tab>
        <Tab
          title={
            <RichTabTitle
              icon={<MessageSquare />}
              label="Comments"
              count={commentLogs.length}
            />
          }
        >
          <Box pad={{ vertical: 'medium' }} direction="column-reverse">
            {commentLogs.map((log, index) => {
              return (
                <IssueLog key={index} log={log} logType={LogType.Comment} />
              )
            })}
          </Box>
        </Tab>
        {issue?.fundable && (
          <Tab
            title={
              <RichTabTitle
                icon={<DollarSign />}
                label="Funds"
                count={fundLogs.length}
              />
            }
          >
            <Box pad={{ vertical: 'medium' }} direction="column-reverse">
              {fundLogs.map((log, index) => {
                return (
                  <IssueLog
                    key={index}
                    log={log}
                    logType={LogType.Fund}
                    fund={(issue?.funds ?? [])[index]}
                  />
                )
              })}
            </Box>
          </Tab>
        )}
        <Tab
          title={
            <RichTabTitle
              icon={<Info />}
              label="Status"
              count={statusLogs.length}
            />
          }
        >
          <Box pad={{ vertical: 'medium' }} direction="column-reverse">
            {statusLogs.map((log, index) => {
              return <IssueLog key={index} log={log} logType={LogType.Status} />
            })}
          </Box>
        </Tab>
      </Tabs>
    </Box>
  )
}
