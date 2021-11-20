import { useState } from 'react'
import { Layer, Box, TextInput, Text, Button } from 'grommet'
import { Issue, ToastType } from 'type'
import { toast } from 'utils/common'
import { utils } from 'near-api-js'
import { useAccount } from 'hooks/wallet'

export default function FundModal({
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
  const [amount, setAmount] = useState('1')

  const onFundIssue = () => {
    setIsLoading(true)
    const _amount = utils.format.parseNearAmount(amount)
    account
      .functionCall({
        contractId: daoAddress,
        methodName: 'fundIssue',
        args: {
          id: issue.id,
        },
        attachedDeposit: _amount,
      })
      .then(() => {
        setIsLoading(false)
        onClose()
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  return (
    <Layer>
      <Box pad="medium" gap="medium" width="400px">
        <Box gap="small">
          <Text weight="bold">Fund amount</Text>
          <TextInput
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>
        <Box direction="row" justify="around">
          <Button label="Cancel" onClick={onClose} />
          <Button label="Submit" primary onClick={onFundIssue} />
        </Box>
      </Box>
    </Layer>
  )
}
