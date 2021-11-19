import { Box, Text, Anchor } from 'grommet'
import { utils } from 'near-api-js'
import { Fund, Log, LogType } from '../../type'
import { formatTimestamp } from '../../utils/format'
import StatusLabel from '../Common/StatusLabel'

export default function StatusLog({
  log,
  logType,
  fund,
}: {
  log: Log
  logType: LogType
  fund?: Fund
}) {
  return (
    <Box direction="row" gap="medium">
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
        <Anchor label={log.sender} />
        <Text>{log.message}</Text>
        {logType === LogType.Status && <StatusLabel status={log.status} />}
        {logType === LogType.Fund && fund && (
          <Box gap="xsmall" direction="row" align="center">
            <Text>{utils.format.formatNearAmount(fund?.amount)}</Text>
            <Text size="xlarge">Ⓝ</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
