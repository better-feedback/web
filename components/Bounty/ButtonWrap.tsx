import { Box, Text } from 'grommet'

export default function ButtonWrap({ title, icon, onClick, background }) {
  return (
    <Box
      direction="row"
      flex="grow"
      align="center"
      justify="center"
      gap="small"
      pad="small"
      background={background}
      onClick={onClick}
    >
      {icon}
      <Text>{title}</Text>
    </Box>
  )
}
