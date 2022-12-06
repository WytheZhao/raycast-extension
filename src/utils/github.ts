import { Octokit } from '@octokit/rest'
import { getPreferenceValues } from '@raycast/api'
import { Preferences } from '../@types'

import { HttpsProxyAgent } from 'https-proxy-agent'
import fetch from 'node-fetch'

let octokit: Octokit | undefined

export function getOctokit() {
    if (!octokit) {
        const { ghToken: auth } = getPreferenceValues<Preferences>()

        // TODO: 这里需要考虑系统是否存在代理 | {}
        const request = {
            agent: new HttpsProxyAgent('http://127.0.0.1:8118'),
            fetch,
        }

        octokit = new Octokit({ auth, request })
    }
    return octokit
}
