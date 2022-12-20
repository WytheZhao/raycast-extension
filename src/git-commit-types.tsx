import { ActionPanel, Action, List } from '@raycast/api'

export default function Command() {
    const data = [
        { name: 'feat', info: '新功能、新特性' },
        { name: 'fix', info: '修改 bug' },
        { name: 'perf', info: '更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）' },
        { name: 'refactor', info: '代码重构（重构，在不影响代码内部行为、功能下的代码修改）' },
        { name: 'docs', info: '文档修改' },
        { name: 'style', info: '代码格式修改, 注意不是 css 修改（例如分号修改）' },
        { name: 'test', info: '测试用例新增、修改' },
        { name: 'build', info: '影响项目构建或依赖项修改' },
        { name: 'revert', info: '恢复上一次提交' },
        { name: 'ci', info: '持续集成相关文件修改' },
        { name: 'chore', info: '其他修改（不在上述类型中的修改）' },
        { name: 'release', info: '发布新版本' },
        { name: 'workflow', info: '工作流相关文件修改' },
    ]

    return (
        <List>
            {data?.map(({ name, info }) => (
                <List.Item
                    key={name}
                    title={name}
                    subtitle={info}
                    actions={
                        <ActionPanel>
                            <Action.CopyToClipboard content={`${name}: `} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    )
}
