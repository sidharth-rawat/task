import React from 'react'

export type RenderIfType = {
    component: JSX.Element
    condition: boolean
}

export const RenderIf = (props: RenderIfType) => {
    const { component, condition } = props;
    return (
        !!condition ? component : <></>
    )
}
