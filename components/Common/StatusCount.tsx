import { Box, Text } from 'grommet'
import router from 'next/router'
import { useDAOviewMethod } from '../../hooks/query'
import { DAOMethod, Status, StatusList } from '../../type'

export default function StatusCount({
  status,
  daoAddress,
}: {
  status: Status
  daoAddress: string
}) {
  const count = useDAOviewMethod(
    daoAddress,
    DAOMethod.getIssuesCountByStatus,
    { status },
    0
  )
  return (
    <Box
      width="300px"
      pad="small"
      background="accent-3"
      direction="row"
      align="center"
      justify="between"
      margin={{ bottom: 'small', horizontal: 'xsmall' }}
      style={{ borderRadius: 4 }}
      onClick={() => {
        router.push(`/dao/${daoAddress}/issues?status=${StatusList[status]}`)
      }}
    >
      <Text weight="bold">{StatusList[status]}</Text>
      <Text color="dark-3" weight="bold">
        {count}
      </Text>
    </Box>
  )
}
