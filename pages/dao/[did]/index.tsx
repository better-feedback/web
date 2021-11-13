import { Heading, Box, Button, Image, Text } from 'grommet'
import router, { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BountyCard from '../../../components/Cards/Bounty'
import Layout from '../../../components/Layout'
import { BetterDAO } from '../../../type'
import { getDAOContract, getFactoryContract } from '../../../utils/wallet'

const DAOPage = () => {
  const { query } = useRouter()
  const [dao, setDao] = useState<BetterDAO>()
  const [bounties, setBounties] = useState([])
  const daoName = query.did as string
  useEffect(() => {
    if (!daoName) {
      return
    }
    getDAOContract(daoName).then((contract: any) => {
      contract.getAllBounties().then((bounties: any) => {
        setBounties(bounties)
      })
    })
    getFactoryContract().then((contract: any) => {
      contract.getDAO({ name: daoName }).then((dao: any) => {
        setDao(dao)
      })
    })
  }, [daoName])

  return (
    <Layout title={daoName}>
      <Box direction="column" pad={{ vertical: 'medium' }}>
        <Box direction="row" align="center" justify="between" width="100%">
          <Box direction="row" align="center">
            {dao && dao.logoUrl && (
              <Image src={dao.logoUrl} alt={daoName} height={80} />
            )}
            <Heading margin="none">{daoName}</Heading>
          </Box>

          <Button
            label="Create a bounty"
            primary
            onClick={() => {
              router.push(`/dao/${daoName}/bounty/new`)
            }}
          />
        </Box>
        <Text>{dao?.description && `Intro: ${dao?.description}`}</Text>
      </Box>

      <Box direction="column">
        {bounties.map((bounty: any) => {
          return <BountyCard dao={dao} bounty={bounty} key={bounty.id} />
        })}
      </Box>
    </Layout>
  )
}

export default DAOPage
