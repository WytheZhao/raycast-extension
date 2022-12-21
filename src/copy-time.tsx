import { ActionPanel, Action, List } from '@raycast/api'
import dayjs from 'dayjs'

export default function Command() {
    const date = new Date()
    const formats = ['YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'MM-DD', 'YYYY-MM-DD HH:mm:ss', 'HH:mm:ss', 'HH:mm']
    return (
        <List>
            {formats?.map(it => (
                <List.Item
                    key={it}
                    title={dayjs(date).format(it)}
                    subtitle={it}
                    actions={
                        <ActionPanel>
                            <Action.CopyToClipboard content={dayjs(date).format(it)} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    )
}
