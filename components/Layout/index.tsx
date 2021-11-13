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
} from 'grommet'
import { useAccount } from '../../hooks/wallet'
import { connectWallet } from '../../utils/wallet'
import { useRouter } from 'next/router'

interface Props {
  title: string
  children: any
}

const Layout = ({ title, children }: Props) => {
  const account = useAccount()
  const router = useRouter()

  return (
    <Grommet theme={grommet} full>
      <Head>
        <title>{`Better${title ? ` | ${title}` : ''}`}</title>
        <meta name="description" content="方舟" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="referrer" content="no-referrer" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        />
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
            label="Create new DAO"
            onClick={() => {
              router.push('/dao/new')
            }}
          />
          <Button
            primary
            color="#008cd5"
            label={account?.accountId ?? 'Connect Near'}
            onClick={connectWallet}
            icon={<Image src="/near-white.svg" alt="Near" width="24px" />}
          />
        </Box>
      </Header>

      <main>
        <ResponsiveContext.Consumer>
          {(size) => {
            return (
              <Box style={{ margin: '0 auto', width: 1000 }}>{children}</Box>
            )
          }}
        </ResponsiveContext.Consumer>
      </main>
    </Grommet>
  )
}

export default Layout