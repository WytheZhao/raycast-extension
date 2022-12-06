import { Detail } from '@raycast/api'
import { usePromise } from '@raycast/utils'

async function func() {
    return '#h1'
}

export default function Command() {
    const { isLoading, data } = usePromise(async () => {
        return await func()
    })
    return <Detail isLoading={isLoading} markdown={data} />
}
