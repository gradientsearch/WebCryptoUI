<script lang="ts">
	import Container from './container.svelte';
	import { hasContext, onMount, untrack } from 'svelte';
	import type { HighlightResult } from 'highlight.js';
	import { highlight } from '$lib/hljs';

	let format: string = $state('jwk');
	let keyData: string = $state('');
	let algorithm: string = $state('AES-GCM');
	let extractable: boolean = $state(true);
	let keyUsages: string[] = $state([]);

	let typedArrayLength: number = $state(10);
	let { idx } = $props();

	let code = $state('');
	let hc: HighlightResult | undefined = $state();
	let output: string | undefined = $state();

	let formats: string[] = ['jwk']; // ['raw', 'pkcs8', 'spki', 'jwk'];
	let algorithms: string[] = ['AES-GCM']; // ['raw', 'pkcs8', 'spki', 'jwk'];
	let keyUsagesOptions: any[] = $state([
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

	$effect(() => {
		format;
		typedArrayLength;
		untrack(() => {
			console.log('untracked');
			code = `\nconst array = new ${format}(${typedArrayLength});
crypto.getRandomValues(array);
console.log(bytesToHex(new Uint8Array(array)))
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

	function importKey() {
		let t = getTypedArray().get(format);
		const array = new t(typedArrayLength);
		crypto.getRandomValues(array);
		output = bytesToHex(new Uint8Array(array));
	}

	function getTypedArray(): Map<String, any> {
		return new Map<String, any>([
			['Int8Array', Int8Array],
			['Uint8Array', Uint8Array],
			['Uint8ClampedArray', Uint8ClampedArray],
			['Int16Array', Int16Array],
			['Uint16Array', Uint16Array],
			['Int32Array', Int32Array],
			['Uint32Array', Uint32Array],
			['BigInt64Array', BigInt64Array],
			['BigUint64Array', BigUint64Array]
		]);
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
			<label for="keyData" class="block text-base font-medium text-base-900"> KeyData</label>

			<textarea
				id="keyData"
				class="mt-1 w-full min-w-[500px] rounded-md border-gray-200 shadow-sm sm:text-sm"
				rows="4"
				placeholder="KeyData"
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
				<input type="checkbox" id="extractable" class="peer sr-only" />

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
					{#each keyUsagesOptions as o, idx}
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

	<Container {idx} bind:hc fn={importKey} {output}></Container>
{/if}
