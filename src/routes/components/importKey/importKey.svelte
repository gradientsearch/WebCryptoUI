<script lang="ts">
	import Container from '../container.svelte';
	import { onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	import Aesgcm from './algorithms/aes/aes.svelte';
	import rsa from './algorithms/rsa/rsa.svelte';

	let { idx, zarf = $bindable() } = $props();

	let format: string = $state('jwk');
	let keyData: string = $state('');
	let isKeyDataHexEncoded = $state(false);
	let keyName = $state('');
	let algorithm: string = $state('AES');
	let extractable: boolean = $state(true);
	let algorithmParams: any = $state();

	let code = $state('');
	let hc: HighlightResult | undefined = $state();
	let output: string | undefined = $state();

	let formats: string[] = ['jwk']; // ['raw', 'pkcs8', 'spki', 'jwk'];
	let algorithms: string[] = ['AES', 'RSA']; // ['raw', 'pkcs8', 'spki', 'jwk'];
	let keyUsageOptions: any[] = $state([
		{ usage: 'encrypt', description: 'The key may be used to encrypt messages.', isChecked: false },
		{ usage: 'decrypt', description: 'The key may be used to decrypt messages.', isChecked: false },
		{ usage: 'sign', description: 'The key may be used to sign messages.', isChecked: false },
		{ usage: 'verify', description: 'The key may be used to verify signatures.', isChecked: false },
		{
			usage: 'deriveKey',
			description: 'The key may be used in deriving a new key.',
			isChecked: false
		},
		{ usage: 'deriveBits', description: 'The key may be used in deriving bits.', isChecked: false },
		{ usage: 'wrapKey', description: 'The key may be used to wrap a key.', isChecked: false },
		{ usage: 'unwrapKey', description: 'The key may be used to unwrap a key.', isChecked: false }
	]);

	const ALGORITHM_COMPONENTS = new Map<String, any>([
		['AES', Aesgcm],
		['RSA', rsa]
	]);
	function getAlgorithmComponent(algo: string): any {
		return ALGORITHM_COMPONENTS.get(algo);
	}

	$effect(() => {
		format;
		keyData;
		extractable;
		/** need to track the isChecked values of keyOptions*/
		keyUsageOptions.filter((o) => {
			return o.isChecked;
		});
		algorithmParams;
		isKeyDataHexEncoded;
		untrack(() => {
			console.log('untracked');
			code = `\nlet keyData = \`${keyData}\`
let key = await crypto.subtle.importKey(
	"${format}",
	${format === 'jwk' ? (isKeyDataHexEncoded ? 'JSON.parse(new TextDecoder().decode(hexStringToByteArray(keyData)))' : 'JSON.parse(keyData)') : 'keyData'},
	${algorithmParams},
	${extractable},
	[${keyUsageOptions
		.filter((o) => {
			return o.isChecked;
		})
		.map((o) => {
			return '"' + o.usage + '"';
		})}]
);
`;
			hc = highlight(code);
		});
	});

	async function importKey() {
		let key = await crypto.subtle.importKey(
			'jwk',
			JSON.parse(keyData),
			JSON.parse(algorithmParams),
			extractable,
			keyUsageOptions.filter((o) => o.isChecked).map((o) => o.usage)
		);

		if (zarf?.keys) {
			zarf.keys.push({ name: keyName, key: key });
			console.log(zarf.keys)
		}

		output = String(key);
	}

	onMount(() => {
		hc = highlight(code);
	});
</script>

{#if hc !== undefined}
	<div class="flex flex-row">
		<div class="p-2">
			<label for="format" class="block text-base font-medium text-base-900">Format</label>
			<select
				name="format"
				id="format"
				class="border border-primary-600 bg-base-50 focus:ring-primary-600"
				bind:value={format}
			>
				{#each formats as f}
					<option value={f}>{f}</option>
				{/each}
			</select>
		</div>

		<div class="p-2">
			<label for="keyData" class="flex flex-row text-base font-medium text-base-900">
				<span class="pe-4">KeyData:</span>

				<input class="ps-2 accent-primary-500" type="checkbox" bind:checked={isKeyDataHexEncoded} />
				<label for="algorithm" class="block pe-4 ps-1 text-base font-medium text-base-900"
					>HEX</label
				>

				<input
					class="ps-2 accent-primary-500"
					type="text"
					placeholder="Key Name"
					bind:value={keyName}
				/>
			</label>

			<textarea
				id="keyData"
				class="mt-1 w-full min-w-[500px] rounded-md border-gray-200 shadow-sm sm:text-sm"
				rows="4"
				placeholder="KeyData"
				bind:value={keyData}
			></textarea>
		</div>

		<div class="p-2">
			<label for="algorithm" class="block text-base font-medium text-base-900">Algorithm</label>
			<select
				name="algorithm"
				id="algorithm"
				class="border border-primary-600 bg-base-50 focus:ring-primary-600"
				bind:value={algorithm}
			>
				{#each algorithms as f}
					<option value={f}>{f}</option>
				{/each}
			</select>
		</div>

		<div class="p-2">
			<label for="extractable" class="block text-base font-medium text-base-900">Extractable</label>

			<label
				for="extractable"
				class="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary-500"
			>
				<input type="checkbox" bind:checked={extractable} id="extractable" class="peer sr-only" />

				<span
					class="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-white transition-all peer-checked:start-6"
				></span>
			</label>
		</div>

		<div class="p-2">
			<label for="extractable" class="block text-base font-medium text-base-900">KeyOptions</label>

			<fieldset>
				<legend class="sr-only">Checkboxes</legend>

				<div class="space-y-2">
					{#each keyUsageOptions as o, idx}
						<label for="Option{idx}" class="flex cursor-pointer items-start gap-4">
							<div class="flex items-center">
								&#8203;
								<input
									type="checkbox"
									bind:checked={o.isChecked}
									class="size-4 rounded border-gray-300 accent-primary-500"
									id="Option{idx}"
								/>
							</div>

							<div>
								<strong class="font-medium text-gray-900"> {o.usage} </strong>
							</div>
						</label>
					{/each}
				</div>
			</fieldset>
		</div>
	</div>

	{#if algorithm}
		<h1>Algorithm Parameters</h1>
		{@const Component = getAlgorithmComponent(algorithm)}
		<Component bind:algorithmParams></Component>
	{/if}

	{algorithmParams}
	<Container {idx} bind:hc fn={importKey} {output}></Container>
{/if}
