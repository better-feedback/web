import { Box, Text } from 'grommet'
import { FeedbackTag } from '../../type'
import { getTagColor } from '../../utils/common'

export default function Tags({ tags }: { tags: string[] }) {
  return (
    <Box direction="row">
      {tags.map((tag) => {
        return (
          <Box
            key={tag}
            background={getTagColor(tag as FeedbackTag)}
            pad={{ horizontal: 'small' }}
          >
            <Text size="small">{tag}</Text>
          </Box>
        )
      })}
    </Box>
  )
}
