/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect } from 'react'
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
  Layer,
} from 'grommet'
import { useAccount } from '../../hooks/wallet'
import { connectWallet } from '../../utils/wallet'
import { useRouter } from 'next/router'
import { Plus } from 'react-feather'

interface Props {
  title: string
  children: any
  mainWidth?: number | string
  isLoading?: boolean
}

const Layout = ({ title, children, mainWidth, isLoading }: Props) => {
  const account = useAccount()
  const router = useRouter()

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

      <main>
        <ResponsiveContext.Consumer>
          {(size) => {
            return (
              <Box style={{ margin: '0 auto', width: mainWidth || 1000 }}>
                {children}
              </Box>
            )
          }}
        </ResponsiveContext.Consumer>
        {isLoading && (
          <Layer full background="rgba(0,0,0,0.5)">
            <Box flex align="center" justify="center">
              <div
                dangerouslySetInnerHTML={{
                  __html: `
            <lottie-player src="https://assets5.lottiefiles.com/temp/lf20_KBD6AE.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>
          `,
                }}
              ></div>
            </Box>
          </Layer>
        )}
      </main>
    </Grommet>
  )
}

export default Layout
