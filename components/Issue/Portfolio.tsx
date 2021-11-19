import { Box, Text } from 'grommet'
import { DollarSign, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from '../../hooks/wallet'
import { formatTimestamp } from '../../utils/format'
import { likeIssue } from '../../utils/contract'
import Manage from './Manage'
import StatusLabel from '../Common/StatusLabel'
import { calcFund, toast } from '../../utils/common'
import { Status, ToastType } from '../../type'
import CategoryLabel from '../Common/CategoryLabel'
import { useState } from 'react'
import FundModal from './FundModal'
import { utils } from 'near-api-js'

const Row = ({ title, value }) => {
  return (
    <Box gap="xsmall">
      <Text size="small">{title}</Text>
      {typeof value === 'string' ? <Text>{value}</Text> : value}
    </Box>
  )
}

export default function Portfolio({
  issue,
  daoAddress,
  setIsLoading,
  isCouncil,
}) {
  const account = useAccount()
  const [isFundModalVisible, setIsFundModalVisible] = useState(false)

  if (!issue) {
    return (
      <Box
        direction="column"
        pad="none"
        background="white"
        style={{ flex: '0 0 400px', height: 400, border: '1px solid #333' }}
      ></Box>
    )
  }

  const onLikeIssue = () => {
    setIsLoading(true)
    likeIssue(daoAddress, issue.id)
      .then(() => {
        setIsLoading(false)
        window.location.reload()
      })
      .catch((error) => {
        toast(ToastType.ERROR, error.message)
        setIsLoading(false)
      })
  }

  const isLiked = issue?.likes?.includes(account?.accountId)

  return (
    <Box
      direction="column"
      pad="none"
      background="white"
      style={{ flex: '0 0 300px' }}
    >
      <Box pad="small" gap="small">
        <Row
          title="Category"
          value={<CategoryLabel category={issue.category} />}
        />
        <Row title="Status" value={<StatusLabel status={issue.status} />} />
        <Row title="Created by" value={issue.createdBy} />
        <Row
          title="Created at"
          value={issue ? formatTimestamp(issue.createdAt) : ''}
        />
        {issue.fundable && (
          <Row
            title="Bounty"
            value={
              <Box direction="row" align="center" gap="xsmall">
                <Text color="brand">
                  {utils.format.formatNearAmount(calcFund(issue?.funds ?? []))}
                </Text>
                <Text size="xlarge">Ⓝ</Text>
              </Box>
            }
          />
        )}
      </Box>

      <Box direction="row" justify="between">
        <ButtonWrap
          title={isLiked ? 'Liked' : 'Like'}
          background={isLiked ? 'status-unknown' : 'accent-4'}
          onClick={() => {
            if (!isLiked) {
              onLikeIssue()
            }
          }}
          icon={<ThumbsUp size={20} />}
        />
        {issue.fundable && issue.status !== Status.Completed && (
          <ButtonWrap
            title="Fund"
            background="status-ok"
            onClick={() => {
              setIsFundModalVisible(true)
            }}
            icon={<DollarSign size={20} />}
          />
        )}
      </Box>

      {isCouncil && (
        <Manage
          issue={issue}
          daoAddress={daoAddress}
          feedbackId={issue?.id}
          setIsLoading={setIsLoading}
        />
      )}
      {isFundModalVisible && (
        <FundModal
          setIsLoading={setIsLoading}
          issue={issue}
          onClose={() => setIsFundModalVisible(false)}
          daoAddress={daoAddress}
        />
      )}
    </Box>
  )
}
