import { Box } from 'grommet'
import { useState } from 'react'
import * as Icons from 'react-feather'
import { Issue, Status, ToastType } from '../../type'
import { getStatusConfig, toast } from '../../utils/common'
import BountyModal from './BountyModal'
import ButtonWrap from './ButtonWrap'

export default function Manage({
  issue,
  daoAddress,
  feedbackId,
  setIsLoading,
}: {
  issue: Issue
  daoAddress: string
  feedbackId: number
  setIsLoading: any
}) {
  const [isBountyModalVisible, setIsBountyModalVisible] = useState(false)
  const { actions } = getStatusConfig(issue?.status)

  return (
    <Box>
      {actions.map(({ icon, nextStatus, call }) => {
        const Icon = Icons[icon]
        const { color, actionName } = getStatusConfig(nextStatus)
        return (
          <ButtonWrap
            key={nextStatus}
            title={actionName}
            icon={<Icon size={16} />}
            background={color}
            onClick={() => {
              setIsLoading(true)
              call(daoAddress, feedbackId)
                .then(() => {
                  setIsLoading(false)
                  window.location.reload()
                })
                .catch((error) => {
                  setIsLoading(false)
                  toast(ToastType.ERROR, error.message)
                })
            }}
          />
        )
      })}
      {issue?.status === Status.Planned && !issue.fundable && (
        <ButtonWrap
          title="Bounty"
          icon={<Icons.DollarSign size={16} />}
          background="status-error"
          onClick={() => {
            setIsBountyModalVisible(true)
          }}
        />
      )}
      {isBountyModalVisible && (
        <BountyModal
          onClose={() => setIsBountyModalVisible(false)}
          daoAddress={daoAddress}
          issue={issue}
          setIsLoading={setIsLoading}
        />
      )}
    </Box>
  )
}
