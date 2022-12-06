import {
    Action,
    ActionPanel,
    Alert,
    confirmAlert,
    Form,
    Icon,
    List,
    showToast,
    Toast,
    useNavigation,
} from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { RecordListItem } from 'tencentcloud-sdk-nodejs/tencentcloud/services/dnspod/v20210323/dnspod_models'
import { DefaultErrorView } from './components/ErrorView'
import { getTencentDNSPod } from './utils/tencent'

function CreateRecord(props: { Domain: string }) {
    const types = ['A', 'CNAME', 'MX', 'TXT', 'NS', 'AAAA', 'SPF', 'SRV', 'CAA', '显性URL', '隐性URL']

    const { pop } = useNavigation()

    const onSubmit = async (values: { RecordType: string; Value: string; Name: string }) => {
        const toast = await showToast({
            style: Toast.Style.Animated,
            title: 'Creating.',
        })
        try {
            await getTencentDNSPod().CreateRecord({
                Domain: props.Domain,
                RecordType: values.RecordType,
                RecordLine: '默认',
                Value: values.Value,
                SubDomain: values.Name,
            })
            toast.style = Toast.Style.Success
            toast.title = 'Creation succeeded.'
            pop()
        } catch {
            toast.style = Toast.Style.Failure
            toast.title = 'Create failed。'
        }
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm onSubmit={onSubmit} />
                </ActionPanel>
            }
        >
            <Form.TextField id="Name" title="Name" placeholder="Enter record name" />
            <Form.Dropdown id="RecordType" title="RecordType" defaultValue={types[0]}>
                {types.map(item => (
                    <Form.Dropdown.Item key={item} value={item} title={item} />
                ))}
            </Form.Dropdown>
            <Form.TextField id="Value" title="Value" placeholder="Enter record value" />
        </Form>
    )
}

function ShowRecords(props: { Domain: string }) {
    const { isLoading, data, error, revalidate } = usePromise(async () => {
        const res = await getTencentDNSPod().DescribeRecordList(props)
        return res.RecordList.filter(item => {
            return !(item.Value.includes('dnspod') && item.Type === 'NS')
        })
    })

    const deleteRecord = async (record: RecordListItem) => {
        if (
            await confirmAlert({
                title: 'Are you sure?',
                primaryAction: {
                    title: 'Delete',
                    style: Alert.ActionStyle.Destructive,
                },
            })
        ) {
            const toast = await showToast({
                style: Toast.Style.Animated,
                title: 'Deleting.',
            })
            try {
                await getTencentDNSPod().DeleteRecord({ Domain: props.Domain, RecordId: record.RecordId })
                toast.style = Toast.Style.Success
                toast.title = 'Deletion succeeded.'
                revalidate()
            } catch {
                toast.style = Toast.Style.Failure
                toast.title = 'Delete failed.'
            }
        }
    }

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
                        actions={
                            <ActionPanel>
                                <Action
                                    title="Delete"
                                    icon={Icon.DeleteDocument}
                                    style={Action.Style.Destructive}
                                    onAction={() => deleteRecord(item)}
                                ></Action>
                            </ActionPanel>
                        }
                    />
                ))
            )}
        </List>
    )
}

export default function Command() {
    const { isLoading, data, error } = usePromise(async () => {
        const res = await getTencentDNSPod().DescribeDomainList({})
        return res.DomainList
    })
    return (
        <List isLoading={isLoading}>
            {error ? (
                <DefaultErrorView />
            ) : (
                data?.map(item => (
                    <List.Item
                        key={item.DomainId}
                        title={item.Name}
                        subtitle={item.Remark}
                        actions={
                            <ActionPanel>
                                <Action.Push title="Show records" target={<ShowRecords Domain={item.Name} />} />
                                <Action.Push title="Create record" target={<CreateRecord Domain={item.Name} />} />
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
