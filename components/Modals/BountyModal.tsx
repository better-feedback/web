import { useState } from 'react'
import { Layer, Box, Text, Button, Select, Heading, TextInput } from 'grommet'
import { ExLvList, Issue, ToastType } from 'type'
import { toast } from 'utils/common'
import { utils } from 'near-api-js'
import { useAccount } from 'hooks/wallet'

export default function BountyModal({
  issue,
  daoAddress,
  onClose,
  setIsLoading,
}: {
  issue: Issue
  daoAddress: string
  onClose: any
  setIsLoading: any
}) {
  const account = useAccount()
  const [exLv, setExLv] = useState(ExLvList[0])
  const [amount, setAmount] = useState('1')

  const onIssueToBounty = () => {
    setIsLoading(true)
    const _amount = utils.format.parseNearAmount(amount)
    account
      .functionCall({
        contractId: daoAddress,
        methodName: 'issueToBounty',
        args: {
          id: issue.id,
          exLv: ExLvList.indexOf(exLv),
        },
        attachedDeposit: _amount,
      })
      .then(() => {
        setIsLoading(false)
        onClose()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  return (
    <Layer>
      <Box pad="medium" gap="medium" width="400px">
        <Heading level={3} margin="none">
          Issue to Bounty
        </Heading>

        <Box gap="small">
          <Text weight="bold">Experience Level</Text>
          <Select
            options={ExLvList}
            value={exLv}
            onChange={({ option }) => setExLv(option)}
          />
        </Box>

        <Box gap="small">
          <Text weight="bold">Bounty</Text>
          <TextInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>

        <Box direction="row" justify="around">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Submit" primary onClick={onIssueToBounty} />
        </Box>
      </Box>
    </Layer>
  )
}
