import { DB_CREATE_STATEMENTS, DB_FILENAME } from '../../../constants';
import type { AdapterInterface, DbSetting, SettingsMap } from '../../../types';
import Database from "tauri-plugin-sql-api";
import { BaseAdapter } from './base.adapter';
import { dbReady } from '../../../stores/app.store';
import { tick } from 'svelte';

export class SQLiteAdapter extends BaseAdapter implements AdapterInterface {
	db: any;

	constructor() {
    super();
    
    Database.load(`sqlite:${DB_FILENAME}`)
    .then(async db => {
      this.db = db;
      await this.runCreateStatements();
      await tick();
      dbReady.update(() => true);
    })
    .catch(console.error);
	}

  private async runCreateStatements() {
    for (const s of DB_CREATE_STATEMENTS) {
      try {
        await this.db.execute(s);
      }
      catch(err) {
        console.warn(s);
        console.error(err);
      }
    }
  }

  async insertInto(table: string, data: any) {
    const { columns, placeholders, values } = this.prepareInsert(data);
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const res = await this.db.execute(sql, values);
		return res.lastInsertId; 
  }

  async update(table: string, id: number, data: any) {
    const { updates, values } = this.prepareUpdate(data, id);
    const sql = `UPDATE ${table} SET ${updates} WHERE id = $${values.length}`;
    const res = await this.db.execute(sql, values);
    return res;
  }

	async putSetting(name: string, value: string) {
    const existing = await this.db.select(
      `SELECT * FROM settings WHERE name = $1`,
      [name]
    );
    const data = {name, value};
		if (existing?.length) {
      return this.update('settings', existing[0].id, data);
		} else {
      return this.insertInto('settings', data);
		}
	}

	async getSettings() {
    return await this.db.select(
      `select * from settings`
    ) as DbSetting[];
	}

	async getSettingsMap() {
		const settings = await this.getSettings();
		const map: SettingsMap = { options: {} };
		settings.forEach((s) => this.settingToObject(s, map));
		return map;
	}
}

export const db = new SQLiteAdapter();
