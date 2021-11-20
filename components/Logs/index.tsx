import { Box, Text, Tab, Tabs } from 'grommet'
import _ from 'lodash'
import { DollarSign, Info, MessageSquare, ThumbsUp, Users } from 'react-feather'
import { Issue, Log, LogType } from 'type'
import Applicants from './Applicants'
import IssueLogs from './IssueLogs'

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
)

export default function Logs({
  logs,
  likes,
  issue,
  isCouncil,
  setIsLoading,
}: {
  logs: Log[]
  likes: string[]
  issue: Issue
  isCouncil: boolean
  setIsLoading: any
}) {
  const statusLogs = logs.filter((l) => l.logType === LogType.Status)
  const commentLogs = logs.filter((l) => l.logType === LogType.Comment)

  return (
    <Box background="white" pad="medium" margin={{ top: 'medium' }}>
      <Tabs justify="start" alignControls="start">
        <Tab
          title={
            <RichTabTitle
              icon={<ThumbsUp />}
              label={`Likes(${likes.length})`}
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
              label={`Comments(${commentLogs.length})`}
            />
          }
        >
          <IssueLogs logs={commentLogs} logType={LogType.Comment} />
        </Tab>
        <Tab
          title={
            <RichTabTitle
              icon={<Info />}
              label={`Status(${statusLogs.length})`}
            />
          }
        >
          <IssueLogs logs={statusLogs} logType={LogType.Status} />
        </Tab>

        {issue?.fundable && (
          <Tab
            title={
              <RichTabTitle
                icon={<DollarSign />}
                label={`Funds(${issue?.funds.length})`}
              />
            }
          >
            <IssueLogs logs={issue?.funds} logType={LogType.Fund} />
          </Tab>
        )}

        {issue?.fundable && (
          <Tab
            title={
              <RichTabTitle
                icon={<Users />}
                label={`Applicants(${(issue?.applicants || []).length})`}
              />
            }
          >
            <Applicants
              applicants={issue?.applicants ?? []}
              isCouncil={isCouncil}
              setIsLoading={setIsLoading}
            />
          </Tab>
        )}
      </Tabs>
    </Box>
  )
}
