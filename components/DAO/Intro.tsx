import { Box, Heading, Image, Button, Text, Anchor } from 'grommet'
import { getDAOName } from 'utils/common'
import { Edit, Link, Plus } from 'react-feather'
import router from 'next/router'
import { useDAOviewMethod } from 'hooks/query'
import { DAOMethod } from 'type'
import { useAccount } from 'hooks/wallet'

export default function DAOIntro({ daoAddress }) {
  const account = useAccount()
  const dao = useDAOviewMethod(
    daoAddress,
    DAOMethod.getDAOInfo,
    undefined,
    null
  )

  const council = useDAOviewMethod(
    daoAddress,
    DAOMethod.getCouncil,
    undefined,
    []
  )

  console.log(council)

  const isCouncil = council.includes(account?.accountId)

  return (
    <Box
      direction="column"
      align="center"
      style={{ width: 1200, margin: '0 auto' }}
      pad={{ vertical: 'medium' }}
    >
      <Box direction="row" align="center" justify="between" width="90%">
        <Box direction="row" align="center">
          {dao && dao.logoUrl && (
            <Image src={dao.logoUrl} alt={daoAddress} height={80} />
          )}
          <Box pad={{ horizontal: 'small' }} gap="small">
            <Heading level={3} margin="none">
              {getDAOName(daoAddress)}
            </Heading>
            {dao && dao.projectUrl && (
              <Anchor
                href={dao.projectUrl}
                label={dao.projectUrl}
                icon={<Link size={16} />}
                size="small"
                target="_blank"
                style={{ whiteSpace: 'nowrap' }}
              />
            )}
            <Text size="small">{dao?.description}</Text>
          </Box>
        </Box>

        <Box direction="row" align="center" gap="small">
          <Button
            label="Issue"
            icon={<Plus />}
            primary
            onClick={() => {
              router.push(`/dao/${daoAddress}/issue/new`)
            }}
          />

          {isCouncil && (
            <Button
              label="DAO"
              icon={<Edit />}
              primary
              onClick={() => {
                router.push(`/dao/${daoAddress}/edit`)
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
