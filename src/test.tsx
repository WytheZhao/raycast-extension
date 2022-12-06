import { Action, ActionPanel, Icon, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { DefaultErrorView } from './components/ErrorView'
import { getTencent } from './utils/tencent'

function ShowRecords(props: { Domain: string }) {
    const { isLoading, data, error } = usePromise(async () => {
        const res = await getTencent().DescribeRecordList(props)
        return res.RecordList
    })
    return (
        <List isLoading={isLoading}>
            {error ? (
                <DefaultErrorView />
            ) : (
                data?.map(item => (
                    <List.Item
                        key={item.RecordId}
                        title={item.Name}
                        subtitle={item.Value}
                        accessories={[{ text: item.Type }]}
                    />
                ))
            )}
        </List>
    )
}

export default function Command() {
    const { isLoading, data, error } = usePromise(async () => {
        const res = await getTencent().DescribeDomainList({})
        return res.DomainList
    })
    return (
        <List isLoading={isLoading}>
            {error ? (
                <DefaultErrorView />
            ) : (
                data?.map(item => (
                    <List.Item
                        icon={item.Status === 'ENABLE' ? Icon.Bolt : Icon.BoltDisabled}
                        key={item.DomainId}
                        title={item.Name}
                        subtitle={item.Remark}
                        actions={
                            <ActionPanel>
                                <Action.Push
                                    title="Show Records"
                                    target={<ShowRecords Domain={item.Name} />}
                                ></Action.Push>
                            </ActionPanel>
                        }
                        accessories={[
                            {
                                icon: Icon.BulletPoints,
                                text: item.RecordCount.toString(),
                            },
                        ]}
                    />
                ))
            )}
        </List>
    )
}
