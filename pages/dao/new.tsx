import { Box, Form, Heading, TextInput, Button, TextArea } from 'grommet'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { getFactoryContract } from '../../utils/wallet'

export default function DAONew({}) {
  const router = useRouter()
  const [subDAO, setSubDAO] = useState({
    subName: '',
    website: '',
    logoUrl: '',
    description: '',
  })

  const createDAO = () => {
    getFactoryContract()
      .then((contract: any) => {
        console.log('--- creating DAO ---', contract)
        contract
          .createDAO({
            name: subDAO.subName,
            url: subDAO.website,
            logoUrl: subDAO.logoUrl,
            description: subDAO.description,
          })
          .then((tx) => {
            router.push(`/dao/${subDAO.subName}`)
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
        <Heading level="2">Create new DAO</Heading>
        <Form
          value={subDAO}
          onChange={(nextValue) => setSubDAO(nextValue)}
          onSubmit={({ value }) => {}}
          style={{ width: 400 }}
        >
          <TextInput
            placeholder="DAO name(will be prefix of .better.near)"
            id="subName"
            name="subName"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            placeholder="Project website"
            id="website"
            name="website"
            type="url"
            style={{ marginBottom: 20 }}
          />
          <TextInput
            placeholder="DAO logo url"
            id="logoUrl"
            name="logoUrl"
            type="url"
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
              onClick={createDAO}
            />
          </Box>
        </Form>
      </Box>
    </Layout>
  )
}