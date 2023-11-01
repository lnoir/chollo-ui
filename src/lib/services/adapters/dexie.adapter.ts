import Dexie, { type Table } from 'dexie';
import type { AdapterInterface, DbSetting } from '../../../types';
import { BaseAdapter } from './base.adapter';

class ChatDexie extends Dexie {
	settings!: Table<DbSetting>;

	constructor() {
		super('chollo');
		this.version(2).stores({
			settings: '++id, &name'
		});
	}
}

export class DexieAdapter extends BaseAdapter implements AdapterInterface {
	db: ChatDexie;

	constructor() {
    super();
		this.db = new ChatDexie();
	}

	async putSetting(name: string, value: string) {
		const existing = await this.db.settings.where('name').equals(name).toArray();
		if (existing?.length) {
			await this.db.settings.put({ name, value, id: existing[0].id });
		} else {
			await this.db.settings.put({ name, value });
		}
	}

	async getSettings() {
		return this.db.settings.toArray();
	}
}

export const db = new DexieAdapter();
