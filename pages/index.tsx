import { Box } from 'grommet'
import { useEffect, useState } from 'react'
import DAOCard from '../components/Cards/DAO'
import Layout from '../components/Layout'
import { BetterDAO } from '../type'
import { getFactoryContract } from '../utils/wallet'

export default function Home() {
  const [daos, setDAOs] = useState<BetterDAO[]>([])
  useEffect(() => {
    getFactoryContract().then((contract: any) => {
      console.log('--- getDAOs ---', contract)
      contract
        .getDAOs()
        .then((daos: BetterDAO[]) => {
          setDAOs(daos)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }, [])
  console.log(daos)
  return (
    <Layout title="Home">
      <Box direction="row" wrap pad={{ vertical: '30px' }}>
        {daos.map((dao) => (
          <DAOCard dao={dao} key={dao.name} />
        ))}
      </Box>
    </Layout>
  )
}
