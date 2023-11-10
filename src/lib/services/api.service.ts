import { error, trace } from 'tauri-plugin-log-api';
import { cholloHost } from '../../stores/settings.store';
import { get } from 'svelte/store';
import type { 
	Doc, DocConfig, DocFormat, DocFormatRecord, DocSource, DocSourceRecord, TaskScheduledIn, TaskScheduledRecord, TaskStep
} from '../../types';

type RequestOptions = {
	signal?: AbortSignal;
};

type WritableData = DocSource | DocFormat | DocConfig | Doc | TaskScheduledIn;

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

	private async read<T>(url: string): Promise<T> {
		const res = await fetch(`${this.baseUrl}${url}`);
		return res.json();
	}

	private async write(method: WriteMethods, path: string, data: object, requestOptions?: RequestOptions) {
		const body = JSON.stringify(data);
		const opts = requestOptions || {};
		const url = `${this.baseUrl}${path}`;
		const res = await fetch(url, {
			method,
			body,
			headers: {
				"Content-Type": "application/json",
			},
			...opts
		});
		return res;
	}

	private async delete(path: string) {
		const url = `${this.baseUrl}${path}`;
		const res = await fetch(url, {
			method: 'DELETE',
			headers: {
				"Content-Type": "application/json",
			},	
		});
		return res;
	}

	async post(path: string, data: object, requestOptions?: RequestOptions) {
		const res = await this.write('POST', path, data, requestOptions);
		return res.json();
	}

	async put(path: string, data: object, requestOptions?: RequestOptions) {
		const res = await this.write('PUT', path, data, requestOptions);
		return res.json();
	}

	preparePath(path: string, data: WritableData) {
		const p = data.id
			? path + `/${data.id}`
			: path;
		return p;
	}

	async putOrPost(path: string, data: WritableData) {
		return data.id ? this.put(path, data) : this.post(path, data);
	}

	async getDocSources() {
		try {
			return this.read<DocSourceRecord[]>('/docs/source');
		}
		catch(err: any) {
			error(err.message);
			console.error(err);
			return [];
		}
	}

	async getDocSource(id: string | number) {
		return this.read<DocSourceRecord>(`/docs/source/${id}`);
	}

	async saveDocSource(data: DocSource): Promise<any> {
		const path = this.preparePath('/docs/source', data);
		return this.putOrPost(path, data);
	}
	
	async deleteDocSource(id: number): Promise<any> {
		const path = `/docs/source/${id}`;
		return this.delete(path);
	}
	
	async getDocFormat(id: string | number) {
		return this.read<DocFormatRecord>(`/docs/format/${id}`);
	}

	async saveDocFormat(data: DocFormat): Promise<any> {
		const path = this.preparePath('/docs/format', data);
		return this.putOrPost(path, data);
	}
	
	async saveDocConfig(data: DocConfig): Promise<any> {
		const path = this.preparePath('/docs/config', data);
		return this.putOrPost(path, data);
	}

	async getTasks() {
		return this.read<TaskScheduledRecord>('/tasks/scheduled');
	}

	async saveTaskScheduled(data: TaskScheduledIn) {
		const path = this.preparePath('/tasks/scheduled', data);
		return this.putOrPost(path, data);
	}
		
	async deleteTask(id: number): Promise<any> {
		const path = `/tasks/scheduled/${id}`;
		return this.delete(path);
	}

	async getTask(id: string | number) {
		return this.read<TaskScheduledRecord>(`/tasks/scheduled/${id}`);
	}

	async saveTaskStep(data: TaskStep) {
		const path = this.preparePath('/tasks/step', data);
		return this.putOrPost(path, data);
	}

	async enableTaskJob(taskId: number) {
		return this.post(`/tasks/scheduled/${taskId}/enable`, {id: taskId});
	}

	async disableTaskJob(taskId: number) {
		return this.delete(`/tasks/scheduled/${taskId}/disable`);
	}

	async getTaskJob(taskId: number) {
		return this.read(`/tasks/scheduled/${taskId}/job`);
	}
}

export const apiService = new CholloService();