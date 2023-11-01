import type { DbSetting, SettingsMap } from '../../types';
import { SQLiteAdapter } from './adapters/sqlite.adapter';

export class ChatDb {
	db;

	constructor() {
		//this.db = new DexieAdapter();
		this.db = new SQLiteAdapter();
	}

	async putSetting(name: string, value: string) {
		return this.db.putSetting(name, value);
	}

	async getSettings() {
		return this.db.getSettings();
	}

	async getSettingsMap() {
		const settings = (await this.getSettings()) as unknown as any[];
		const map: SettingsMap = { options: {} };
		settings.forEach((s) => this.settingToObject(s, map));
		return map;
	}

	settingToObject(setting: DbSetting, settingsMap: SettingsMap): void {
		const levels = setting.name.split('.');
		// eslint-disable @typescript-eslint/no-explicit-any
		levels.reduce((prev: any, curr: string, i: number) => {
			if (i === levels.length - 1) {
				prev[curr] = setting.value;
				return settingsMap;
			} else if (!prev[curr]) {
				prev[curr] = {};
			}
			return prev[curr];
		}, settingsMap);
	}
}

export const db = new ChatDb();
