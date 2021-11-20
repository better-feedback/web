import { Box, Text, Anchor } from 'grommet'
import { utils } from 'near-api-js'
import { Fund, Log, LogType } from 'type'
import { formatTimestamp } from 'utils/format'
import StatusLabel from 'components/Common/StatusLabel'

function IssueLog({ log, logType }: { log: any; logType: LogType }) {
  return (
    <Box
      direction="row"
      gap="medium"
      pad={{ horizontal: 'medium', bottom: 'medium', top: '0px' }}
    >
      <Box>
        <Text size="small">{formatTimestamp(log.timestamp)}</Text>
        <Text size="small">{formatTimestamp(log.timestamp, 'HH:MM:ss')}</Text>
      </Box>
      <Box
        flex="grow"
        gap="small"
        pad={{ bottom: 'small' }}
        style={{ borderBottom: '1px solid #e3e3e3' }}
      >
        <Anchor label={logType === LogType.Fund ? log.funder : log.sender} />
        <Text>{log.message || 'Fund'}</Text>
        {logType === LogType.Status && <StatusLabel status={log.status} />}
        {logType === LogType.Fund && log && (
          <Box gap="xsmall" direction="row" align="center">
            <Text>{utils.format.formatNearAmount(log?.amount)}</Text>
            <Text size="xlarge">Ⓝ</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default function IssueLogs({
  logs,
  logType,
}: {
  logs: Log[] | Fund[]
  logType: LogType
}) {
  return (
    <Box direction="column-reverse" pad={{ top: 'medium' }}>
      {logs.map((log, index) => {
        return <IssueLog key={index} log={log} logType={logType} />
      })}
    </Box>
  )
}
