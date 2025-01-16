import GetRandomValues from './components/getRandomValues.svelte';
import ImportKey from './components/importKey.svelte';
import Methods from './components/methods.svelte';
import RandomUuid from './components/randomUUID.svelte';

export let components = {
	randomUUID: {
		component: RandomUuid,
		order: 1
	},
	getRandomValues: {
		components: GetRandomValues,
		order: 2
	},
	importKey: {
		components: ImportKey,
		order: 3
	}
};

export function getSortedComponents(): string[] {
	return Object.keys(components).sort((a, b) => {
		return components[a].order < components[b].order ? 0 : 1;
	});
}

export function getComponent(type: string) {
	switch (type) {
		case 'randomUUID':
			return RandomUuid;
		case 'getRandomValues':
			return GetRandomValues;
		case 'importKey':
			return ImportKey;
		case 'methods':
			return Methods;
	}
}
