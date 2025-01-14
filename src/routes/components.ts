import RandomUuid from "./components/randomUUID.svelte";

export function getComponent(type: string) {
    switch (type) {
        case 'randomUUID':
            return RandomUuid
    }
}