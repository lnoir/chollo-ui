import { error, trace } from 'tauri-plugin-log-api';
import { cholloHost } from '../../stores/settings.store';
import { get } from 'svelte/store';

type RequestOptions = {
	signal?: AbortSignal;
};

class CholloService {
	baseUrl = '';

	constructor() {
		this.setHost();
	}

	async setHost() {
		const host = get(cholloHost);
		this.baseUrl = `${host}/v1`;
	}

	async get(url: string) {
		console.log(`${this.baseUrl}${url}`)
		const res = await fetch(`${this.baseUrl}${url}`);
		return res.json();
	}

	async post(path: string, data: object, requestOptions?: RequestOptions) {
		const opts = requestOptions || {};
		const url = `${this.baseUrl}${path}`;
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			...opts
		});
		return res.body;
	}

	async getDocSources(): Promise<any[]> {
		try {
			const res = await this.get('/docs/source');
			trace(`@TRY res: ${JSON.stringify(res)}`);
			return res;
		}
		catch(err: any) {
			error(err.message);
			console.error(err);
			return [];
		}
	}

	async getDocSource(id: string | number): Promise<any> {
		return this.get(`/docs/source/${id}`);
	}
}

export const apiService = new CholloService();
