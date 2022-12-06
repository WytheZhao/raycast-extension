import { getPreferenceValues } from '@raycast/api'
import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/dnspod/v20210323/dnspod_client'
import { Preferences } from '../@types'

let tencent: Client | undefined

export function getTencent() {
    if (!tencent) {
        const { tencentRegion, tencentSecretID, tencentSecretKey } = getPreferenceValues<Preferences>()
        tencent = new Client({
            credential: {
                secretId: tencentSecretID,
                secretKey: tencentSecretKey,
            },
            region: tencentRegion,
        })
    }
    return tencent
}
