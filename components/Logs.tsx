import { Anchor, Box, Heading, Text } from 'grommet'
import _ from 'lodash'
import { Log } from '../type'
import { formatTimestamp } from '../utils/format'
import StatusLabel from './Common/Status'

export default function Logs({ logs }: { logs: Log[] }) {
  return (
    <Box background="white" pad="medium" margin={{ top: 'medium' }}>
      <Heading level={2} margin="none">
        Logs
      </Heading>
      <Box pad={{ vertical: 'medium' }} direction="column-reverse">
        {logs.map((log, index) => {
          return (
            <Box key={index} direction="row" gap="medium">
              <Box>
                <Text size="small">{formatTimestamp(log.timestamp)}</Text>
                <Text size="small">
                  {formatTimestamp(log.timestamp, 'HH:MM:ss')}
                </Text>
              </Box>
              <Box
                flex="grow"
                gap="small"
                pad={{ bottom: 'small' }}
                style={{ borderBottom: '1px solid #e3e3e3' }}
              >
                <Anchor label={log.sender} />
                <Text>{log.message}</Text>
                <StatusLabel status={log.status} />
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
