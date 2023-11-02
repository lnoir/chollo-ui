import { error, trace } from 'tauri-plugin-log-api';
import { cholloHost } from '../../stores/settings.store';
import { get } from 'svelte/store';
import type { Doc, DocConfig, DocFormat, DocSource } from '../../types';

type RequestOptions = {
	signal?: AbortSignal;
};

type WritableData = DocSource | DocFormat | DocConfig | Doc;

type WriteMethods = 'POST' | 'PUT';

class CholloService {
	baseUrl = '';

	constructor() {
		this.setHost();
	}

	private async setHost() {
		const host = get(cholloHost);
		this.baseUrl = `${host}/v1`;
	}

	private async get(url: string) {
		const res = await fetch(`${this.baseUrl}${url}`);
		return res.json();
	}

	private async write(method: WriteMethods, path: string, data: object, requestOptions?: RequestOptions) {
		const body = JSON.stringify(data);
		const opts = requestOptions || {};
		const url = `${this.baseUrl}${path}`;
		const res = await fetch(url, {
			method: 'POST',
			body,
			headers: {
				"Content-Type": "application/json",
			},
			...opts
		});
		return res.body;
	}

	async post(path: string, data: object, requestOptions?: RequestOptions) {
		return this.write('POST', path, data, requestOptions);
	}

	async put(path: string, data: object, requestOptions?: RequestOptions) {
		return this.write('PUT', path, data, requestOptions);
	}

	preparePath(path: string, data: WritableData) {
		const p = data.id
			? path + `/${data.id}`
			: path;
		return path;
	}

	async putOrPost(path: string, data: WritableData) {
		return data.id ? this.put(path, data) : this.post(path, data);
	}

	async getDocSources(): Promise<any[]> {
		try {
			const res = await this.get('/docs/source');
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

	async saveDocSource(data: DocSource): Promise<any> {
		const path = this.preparePath('/docs/source', data);
		return this.putOrPost(path, data);
	}
	
	async getDocFormat(id: string | number): Promise<any> {
		return this.get(`/docs/format/${id}`);
	}

	async saveDocFormat(data: DocFormat): Promise<any> {
		const path = this.preparePath(`/docs/format`, data);
		return this.putOrPost(path, data);
	}
	
	async saveDocConfig(data: DocConfig): Promise<any> {
		const path = this.preparePath(`/docs/config`, data);
		return this.putOrPost(path, data);
	}
}

export const apiService = new CholloService();