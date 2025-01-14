import RandomUuid from "./components/randomUUID.svelte";


export let components = {
    "randomUUID": {
        component: RandomUuid,
        order: 1,
    }
}


export function getSortedComponents(): string[]{
    return Object.keys(components).sort((a, b) => {
        return components[a].order < components[b].order ? 0 : 1
    })
}

export function getComponent(type: string) {
    switch (type) {
        case 'randomUUID':
            return RandomUuid
    }
}

