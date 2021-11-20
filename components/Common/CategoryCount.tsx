import { Box, Text } from 'grommet'
import router from 'next/router'
import { useDAOviewMethod } from 'hooks/query'
import { DAOMethod } from 'type'

export default function CategoryCount({
  category,
  daoAddress,
}: {
  category: string
  daoAddress: string
}) {
  const count = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssuesCountByCategory,
    { category },
    0
  )
  return (
    <Box
      width="300px"
      pad="small"
      background="accent-1"
      direction="row"
      align="center"
      justify="between"
      margin={{ bottom: 'small', horizontal: 'xsmall' }}
      style={{ borderRadius: 4 }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/issues?category=${category}`)
      }}
    >
      <Text weight="bold">{category}</Text>
      <Text color="dark-3" weight="bold">
        {count}
      </Text>
    </Box>
  )
}
