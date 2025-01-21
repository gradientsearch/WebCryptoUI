<!-- TODO create new algorithm params. need options for IV etc... cant reuse what we used for import key  -->
<script lang="ts">
	import Container from './container.svelte';
	import { onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	import Aesgcm from './algorithms/aes/aes.svelte';
	import rsa from './algorithms/rsa/rsa.svelte';
	import { json } from '@sveltejs/kit';
	import type { key } from '../models/keys';

	let { idx, zarf = $bindable() } = $props();

	let format: string = $state('jwk');
	let cipherText: string = $state('');
	let isCipherTextHexEncoded = $state(false);
	let algorithm: string = $state('AES');
	let algorithmParams: any = $state();
	let keyName = $state('');
	let code = $state('');
	let hc: HighlightResult | undefined = $state();
	let output: string | undefined = $state();

	let algorithms: string[] = ['AES', 'RSA']; // ['raw', 'pkcs8', 'spki', 'jwk'];
	const ALGORITHM_COMPONENTS = new Map<String, any>([
		['AES', Aesgcm],
		['RSA', rsa]
	]);
	function getAlgorithmComponent(algo: string): any {
		return ALGORITHM_COMPONENTS.get(algo);
	}
	$effect(() => {
		format;
		cipherText;
		algorithmParams;
		isCipherTextHexEncoded;
		keyName;
		let params = { name: 'AES-GCM' };
		if (algorithmParams) {
			params = JSON.parse(algorithmParams);
		}

		untrack(() => {
			console.log('untracked');
			code = `\nlet cipherText = ${isCipherTextHexEncoded ? 'new Uint8Array(hexStringToByteArray(' : ''}\`${cipherText}\`${isCipherTextHexEncoded ? '))' : ''}
let plaintext = window.crypto.subtle.decrypt(
    { name: ${params?.name}},
	${keyName},
    ciphertext,
  );
console.log(plaintext);
`;
			hc = highlight(code);
		});
	});

	function bytesToHex(bytes: Uint8Array) {
		return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
	}

	function hexStringToByteArray(hexString: string): number[] {
		return hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
	}

	async function decrypt() {
		let ct: Uint8Array;
		if (isCipherTextHexEncoded) {
			ct = new Uint8Array(hexStringToByteArray(cipherText));
		} else {
			ct = new TextEncoder().encode(cipherText);
		}

		let keys = zarf.keys.filter((k: key) => {
			return k.name === keyName;
		});

		let key: CryptoKey | undefined;
		if (keys.length > 0) {
			key = keys[0].key;
		}
		
		let params = { name: 'AES-GCM' };
		if (algorithmParams) {
			params = JSON.parse(algorithmParams);
		}
		let plaintext = '';
		if (key) {
			let buf = await crypto.subtle.decrypt(
				{ name: params.name }, 
				key, ct);
			console.log(buf);
			plaintext = new TextDecoder().decode(buf);
		}

		output = plaintext
	}

	onMount(() => {
		hc = highlight(code);
	});
</script>

{#if hc !== undefined}
	<div class="flex flex-row">
		<div class="p-2">
			<label for="cipherText" class="flex flex-row text-base font-medium text-base-900">
				<span class="pe-4">Cipher Text:</span>

				<input
					class="ps-2 accent-primary-500"
					type="checkbox"
					bind:checked={isCipherTextHexEncoded}
				/>
				<label for="algorithm" class="block pe-4 ps-1 text-base font-medium text-base-900"
					>HEX</label
				>
			</label>

			<textarea
				id="cipherText"
				class="mt-1 w-full min-w-[500px] rounded-md border-gray-200 shadow-sm sm:text-sm"
				rows="4"
				placeholder="cipherText"
				bind:value={cipherText}
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
			<label for="Key" class="block text-base font-medium text-base-900">Key</label>
			<select
				name="Key"
				id="Key"
				class="border border-primary-600 bg-base-50 focus:ring-primary-600"
				bind:value={keyName}
			>
				{#each zarf.keys as k}
					{#if k.key.usages.join('_').includes('decrypt')}
						<option value={k.name}>{k.name}</option>
					{/if}
				{/each}
			</select>
		</div>
	</div>

	{#if algorithm}
		<h1>Algorithm Parameters</h1>
		{@const Component = getAlgorithmComponent(algorithm)}
		<Component bind:algorithmParams></Component>
	{/if}

	{algorithmParams}
	<Container {idx} bind:hc fn={decrypt} {output}></Container>
{/if}
