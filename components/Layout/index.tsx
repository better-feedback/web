/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  Box,
  Grommet,
  grommet,
  Button,
  ResponsiveContext,
  Header,
  Anchor,
  Image,
  Main,
} from 'grommet'
import { useAccount } from 'hooks/wallet'
import { connectWallet } from 'utils/wallet'
import { useRouter } from 'next/router'
import { Plus } from 'react-feather'
import LoadingMask from 'components/Common/LoadingMask'
import ToasterContainer from 'components/Common/ToasterContainer'

interface Props {
  title: string
  children: any
  mainWidth?: number | string
  isLoading?: boolean
}

const Layout = ({ title, children, mainWidth, isLoading }: Props) => {
  const account = useAccount()
  const router = useRouter()
  const [noti, setNoti] = useState(null)

  return (
    <Grommet theme={grommet} full>
      <Head>
        <title>{`Better${title ? ` | ${title}` : ''}`}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
      </Head>

      <Header
        pad={{ vertical: 'medium', horizontal: 'large' }}
        height="xsmall"
        style={{ borderBottom: '1px solid #e3e3e3' }}
      >
        <Anchor
          href="/"
          icon={<Image src="/logo.png" alt="Logo" width="48px" />}
          label=""
        />
        <Box align="center" justify="end" direction="row" gap="medium">
          <Button
            primary
            color="#333"
            label="DAO"
            icon={<Plus />}
            onClick={() => {
              router.push('/dao/new')
            }}
          />
          <Button
            primary
            color="#008cd5"
            label={account?.accountId ?? 'Connect Near'}
            onClick={() => !account?.accountId && connectWallet()}
            icon={<Image src="/near-white.svg" alt="Near" width="24px" />}
          />
        </Box>
      </Header>

      <Main>
        <ResponsiveContext.Consumer>
          {(size) => {
            return (
              <Box style={{ margin: '0 auto', width: mainWidth || 1200 }}>
                {children}
              </Box>
            )
          }}
        </ResponsiveContext.Consumer>
        {isLoading && <LoadingMask />}
        <ToasterContainer />
      </Main>
    </Grommet>
  )
}

export default Layout
