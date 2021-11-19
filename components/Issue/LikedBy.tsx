import { Box, Text } from 'grommet'

const MAX_DISPLAY_COUNT = 5

export default function LikedBy({ likes }: { likes: string[] }) {
  return (
    <Box direction="column" gap="small">
      {likes.slice(0, 5).map((like) => (
        <Box key={like}>
          <Text>{like}</Text>
        </Box>
      ))}
      {likes.length > MAX_DISPLAY_COUNT && (
        <Text>{`... and ${likes.length - MAX_DISPLAY_COUNT} more`}</Text>
      )}
      {likes.length === 0 && (
        <Text color="dark-6">No one has liked this yet</Text>
      )}
    </Box>
  )
}
