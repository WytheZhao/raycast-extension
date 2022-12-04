import { ActionPanel, Action, Icon, Image, List } from '@raycast/api'
import { usePromise } from '@raycast/utils'
import { DefaultErrorView } from './components/ErrorView'
import { getOctokit } from './utils/github'

export default function Command() {
    const { isLoading, data, error } = usePromise(async () => {
        return await getOctokit().paginate(getOctokit().activity.listReposStarredByAuthenticatedUser)
    })

    return (
        <List isLoading={isLoading}>
            {error ? (
                <DefaultErrorView />
            ) : (
                data?.map(repo => (
                    <List.Item
                        icon={{ source: repo.owner.avatar_url, mask: Image.Mask.Circle }}
                        key={repo.full_name}
                        title={repo.full_name}
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
