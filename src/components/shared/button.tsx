import { PropsWithChildren } from 'react'

function Button({ children }: PropsWithChildren) {
    return <button className="text-white">{children}</button>
}

export default Button
