import { Octokit } from '@octokit/rest'
import { getPreferenceValues } from '@raycast/api'
import { Preferences } from '../@types'

let octokit: Octokit | undefined

export function getOctokit() {
    if (!octokit) {
        const { ghToken } = getPreferenceValues<Preferences>()
        octokit = new Octokit({ auth: ghToken })
    }
    return octokit
}
