import { Box } from 'grommet'
import DAOCard from '../components/Cards/DAO'
import Layout from '../components/Layout'
import { useDaoList } from '../hooks/query'

export default function Home() {
  const daoList = useDaoList()

  return (
    <Layout title="Home">
      <Box direction="row" wrap pad={{ vertical: '30px' }}>
        {daoList.map((name) => (
          <DAOCard name={name} key={name} />
        ))}
      </Box>
    </Layout>
  )
}
