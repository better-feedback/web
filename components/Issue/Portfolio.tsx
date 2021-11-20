import { Box, Text } from 'grommet'
import { DollarSign, Feather, PlayCircle, ThumbsUp } from 'react-feather'
import ButtonWrap from './ButtonWrap'
import { useAccount } from 'hooks/wallet'
import { formatTimestamp } from 'utils/format'
import { likeIssue, startIssue } from 'utils/contract'
import Manage from './Manage'
import StatusLabel from 'components/Common/StatusLabel'
import { calcFund, toast } from 'utils/common'
import { ExLvList, Status, ToastType } from 'type'
import CategoryLabel from 'components/Common/CategoryLabel'
import { useState } from 'react'
import FundModal from 'components/Modals/FundModal'
import { utils } from 'near-api-js'
import ApplyModal from 'components/Modals/ApplyModal'

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
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false)

  if (!issue) {
    return null
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

  const onStartIssue = () => {
    setIsLoading(true)
    startIssue(daoAddress, issue.id)
      .then(() => {
        setTimeout(() => {
          window.location.reload()
        }, 1000)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const isLiked = issue?.likes?.includes(account?.accountId)
  const isAppliable =
    !isCouncil &&
    issue.fundable &&
    issue.status === Status.Planned &&
    !issue?.applicants.some((t) => t.applicant === account?.accountId)

  const isStartable =
    !isCouncil &&
    issue.fundable &&
    issue.status === Status.Planned &&
    issue?.applicants.some(
      (t) => t.applicant === account?.accountId && t.approved
    )

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
                <Text color="brand" weight="bolder" size="xlarge">
                  {utils.format.formatNearAmount(calcFund(issue?.funds ?? []))}
                </Text>
                <Text size="xxlarge">Ⓝ</Text>
              </Box>
            }
          />
        )}
        {issue.fundable && (
          <Row
            title="Experience Level"
            value={ExLvList[issue.experienceLevel]}
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

      {isAppliable && (
        <ButtonWrap
          title="Apply"
          background="neutral-2"
          onClick={() => {
            setIsApplyModalVisible(true)
          }}
          icon={<Feather size={20} />}
        />
      )}
      {isCouncil && (
        <Manage
          issue={issue}
          daoAddress={daoAddress}
          feedbackId={issue?.id}
          setIsLoading={setIsLoading}
        />
      )}
      {isStartable && (
        <ButtonWrap
          title="Start"
          background="neutral-2"
          onClick={onStartIssue}
          icon={<PlayCircle size={20} />}
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
      {isApplyModalVisible && (
        <ApplyModal
          setIsLoading={setIsLoading}
          issue={issue}
          onClose={() => setIsApplyModalVisible(false)}
          daoAddress={daoAddress}
        />
      )}
    </Box>
  )
}
