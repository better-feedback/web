import { Box, Heading, Image, Button, Text, Anchor } from 'grommet'
import { getDAOName } from 'utils/common'
import { Edit, Link, Plus, Settings } from 'react-feather'
import router from 'next/router'
import { useDAOviewMethod } from 'hooks/query'
import { DAOMethod } from 'type'
import { useAccount } from 'hooks/wallet'
import { useState } from 'react'
import CouncilManageModal from '../Modals/CouncilManageModal'

export default function DAOIntro({ daoAddress, setIsLoading }) {
  const account = useAccount()
  const [isCouncilManageModalVisible, setIsCouncilManageModalVisible] =
    useState(false)

  const dao = useDAOviewMethod(
    daoAddress,
    DAOMethod.getDAOInfo,
    undefined,
    null
  )

  const isCouncil = dao?.council.includes(account?.accountId)

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
          <Box pad={{ horizontal: 'small' }} gap="xsmall">
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
            {dao?.description && (
              <Text
                size="small"
                style={{ whiteSpace: 'pre-wrap', maxWidth: 600 }}
              >
                {dao?.description}
              </Text>
            )}

            {dao && (
              <Box direction="row" align="center">
                <Text weight="bold">Council:</Text>
                <Box direction="row" gap="small">
                  {dao.council.map((c, index) => {
                    return <Text key={c}>{c}</Text>
                  })}
                </Box>
                {isCouncil && (
                  <Box direction="row" pad={{ horizontal: 'xsmall' }}>
                    <Anchor
                      style={{ padding: 4 }}
                      icon={<Settings size={16} />}
                      onClick={() => setIsCouncilManageModalVisible(true)}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Box direction="row" align="center" gap="small">
          <Button
            label="Issue"
            icon={<Plus />}
            primary
            onClick={() => {
              router.push(`/issue/new`)
            }}
          />

          {isCouncil && (
            <Button
              label="DAO"
              icon={<Edit />}
              primary
              onClick={() => {
                router.push(`/edit`)
              }}
            />
          )}
        </Box>
      </Box>
      {isCouncilManageModalVisible && (
        <CouncilManageModal
          council={dao?.council}
          daoAddress={daoAddress}
          onClose={() => setIsCouncilManageModalVisible(false)}
          setIsLoading={setIsLoading}
        />
      )}
    </Box>
  )
}
