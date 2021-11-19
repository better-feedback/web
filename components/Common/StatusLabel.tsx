import { Box, Text } from 'grommet'
import { Status } from '../../type'
import { getStatusConfig } from '../../utils/common'

export default function StatusLabel({ status }: { status: Status }) {
  const { color, text } = getStatusConfig(status)
  return (
    <Box direction="row">
      <Box background={color} pad={{ vertical: '4px', horizontal: '10px' }}>
        <Text size="small">{text}</Text>
      </Box>
    </Box>
  )
}
