import { ActionPanel, Action, Icon, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { DefaultErrorView } from './components/ErrorView'
import { getOctokit } from './utils/github'

export default function Command() {
    const { isLoading, data, error } = usePromise(async () => {
        return await getOctokit().paginate(getOctokit().repos.listForAuthenticatedUser)
    })

    return (
        <List isLoading={isLoading}>
            {error ? (
                <DefaultErrorView />
            ) : (
                data?.map(repo => (
                    <List.Item
                        icon={repo.private ? Icon.Lock : Icon.LockUnlocked}
                        key={repo.full_name}
                        title={repo.name}
                        subtitle={repo.description ?? ''}
                        actions={
                            <ActionPanel>
                                <Action.OpenInBrowser url={repo.html_url} />
                            </ActionPanel>
                        }
                        accessories={[
                            {
                                icon: Icon.Star,
                                text: `${repo.stargazers_count}`,
                            },
                        ]}
                    />
                ))
            )}
        </List>
    )
}
