import { Box, Form, Heading, TextInput, Button, TextArea } from 'grommet'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../../../components/Layout'
import { getDAOContract } from '../../../../utils/wallet'

export default function BountyNew({}) {
  const router = useRouter()
  const daoName = router.query.did as string
  const [subDAO, setSubDAO] = useState({
    title: '',
    description: '',
  })

  const createBounty = () => {
    getDAOContract(daoName)
      .then((contract: any) => {
        console.log('--- creating Bounty ---', contract)
        contract
          .createBounty({
            title: subDAO.title,
            description: subDAO.description,
          })
          .then((tx) => {
            router.back()
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <Layout title="New DAO">
      <Box direction="column" align="center" gap="small">
        <Heading level="2">Create a bounty</Heading>
        <Form
          value={subDAO}
          onChange={(nextValue) => setSubDAO(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 500 }}
        >
          <TextInput
            placeholder="Bounty title"
            id="title"
            name="title"
            style={{ marginBottom: 20 }}
          />
          <TextArea
            placeholder="Description"
            id="description"
            name="description"
            style={{ marginBottom: 20, height: 160 }}
          />

          <Box direction="row" justify="center" gap="medium">
            <Button
              type="submit"
              size="large"
              primary
              label="Submit"
              color="#333"
              onClick={createBounty}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}
