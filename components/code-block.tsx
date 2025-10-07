import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CodeBlock = ({ children }: any) => {
    return (
        <pre className="text-base leading-relaxed whitespace-pre-wrap">
            <code>{children}</code>
        </pre>
    )
}

export default CodeBlock