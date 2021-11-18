import { Box, Heading } from 'grommet'
import { FeedbackType, Status } from '../../type'
import { getStatusConfig, hexToRGB } from '../../utils/common'
import FeedbackCard from '../Cards/Feedback'

export default function FeedbackList({
  status,
  issues,
  daoAddress,
}: {
  status: Status
  issues: FeedbackType[]
  daoAddress: string
}) {
  const { text, color } = getStatusConfig(status)
  const list = issues.filter((feedback) => feedback.status === status)
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
        {list.map((feedback: any) => {
          return (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              daoAddress={daoAddress}
            />
          )
        })}
      </Box>
    </Box>
  )
}
