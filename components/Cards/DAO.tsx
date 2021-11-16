import React from 'react'
import { Box, Card, CardBody, CardFooter, Image, Heading, Text } from 'grommet'
import dayjs from 'dayjs'
import router from 'next/router'
import { useDao } from '../../hooks/query'
import { Trash } from 'react-feather'
import { useAccount } from '../../hooks/wallet'
import { CONTRACT_NAME } from '../../utils/config'
import { deleteDAO } from '../../utils/contract'
import { getDAOName } from '../../utils/common'

const Identifier = ({ children, title, subTitle, size, ...rest }) => (
  <Box gap="small" align="center" {...rest}>
    {children}
    <Box>
      <Heading level="2" margin="none">
        {getDAOName(title)}
      </Heading>
      <Text size={size}>
        {subTitle.length > 50 ? subTitle.substr(0, 50) + '...' : subTitle}
      </Text>
    </Box>
  </Box>
)

function DAOCard({ name }: { name: string }) {
  const dao = useDao(name)
  const account = useAccount()

  return (
    <Card
      background="rgba(0, 115, 157, 0.7)"
      width="310px"
      height="300px"
      style={{ margin: 10, position: 'relative' }}
      onClick={() => {
        router.push(`/dao/${name}`)
      }}
    >
      {account?.accountId === CONTRACT_NAME && (
        <Trash
          color="white"
          style={{ position: 'absolute', right: 10, top: 10 }}
          onClick={(e) => {
            e.stopPropagation()
            deleteDAO(name)
          }}
        />
      )}
      <CardBody pad="small">
        <Identifier
          pad="small"
          title={name}
          subTitle={dao?.description ?? ''}
          size="small"
          align="start"
        >
          <Image
            src={dao?.logoUrl ? dao?.logoUrl : '/near-white.svg'}
            height={100}
            alt={name}
          />
        </Identifier>
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'medium', vertical: 'small' }}
        background="rgba(255,255,255,0.2)"
        direction="column"
        gap="none"
        align="start"
      >
        <Text size="small">
          {Number(dao?.createdAt)
            ? dayjs(Number(dao?.createdAt) / 1000000).format('MMM DD, YYYY')
            : 'Unknown'}
        </Text>
      </CardFooter>
    </Card>
  )
}

export default DAOCard
