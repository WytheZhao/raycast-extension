import { List } from '@raycast/api'

export function DefaultErrorView() {
    return (
        <List.EmptyView
            icon="😢"
            title="Something went wrong..."
            description="Check the network or try again later..."
        />
    )
}
