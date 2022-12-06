import { getPreferenceValues } from '@raycast/api'
import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/dnspod/v20210323/dnspod_client'
import { Preferences } from '../@types'

let tencentDNSPod: Client | undefined

export function getTencentDNSPod() {
    if (!tencentDNSPod) {
        const { tencentRegion, tencentSecretID, tencentSecretKey } = getPreferenceValues<Preferences>()
        tencentDNSPod = new Client({
            credential: {
                secretId: tencentSecretID,
                secretKey: tencentSecretKey,
            },
            region: tencentRegion,
        })
    }
    return tencentDNSPod
}
