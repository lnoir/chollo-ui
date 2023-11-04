import type { ToastSettings } from "@skeletonlabs/skeleton";

export type AppModalType = 'component' | 'confirm' | 'prompt' | 'alert';
export type AppLevelType = 'success' | 'info' | 'warn' | 'error';
export type AppDrawerType = 'drawer';

export type AppModalOptions = {
	title?: string;
	component?: string;
	message?: string;
	level?: AppLevelType;
	response?: (result: boolean) => void;
	_id?: string;
};

export type AppDialogOptions = AppModalOptions & {
	type: AppModalType;
	body?: string;
};

export type AppToastOptions = AppModalOptions & ToastSettings & {
	type?: AppLevelType;
	message: string;
};

export type AppDrawerOptions = AppModalOptions & {
	type?: AppDrawerType;
	message: string;
};

export interface GenericQueueFn<T> {
	(data: T): void;
}

export interface AdapterInterface {
	putSetting(name: string, value: string): Promise<void>;
	getSettings(): Promise<DbSetting[]>;
}

export type DbSetting = {
	id?: number;
	name: string;
	value: string | number;
	defaultVal?: string;
}

export type SettingsMap = {
	[key: string]: DbValue | object;
};

export type DbValue = number | number[] | string | boolean | undefined | null;

export type DataObject = {
	[key: string]: DbValue;
};

export type ObjectRecord = {
  created: string;
  updated?: string;
  deleted?: string;
}

export type DocSource = {
  id?: number;
  type: 'web' | 'drive' | 'text';
  name: string;
  location: string;
};

export type DocSourceRecord = DocSource & ObjectRecord & {
  formats?: DocFormatRecord[];
};

export type DocFormat = {
  id?: number;
  type: 'html' | 'json' | 'xml' | 'text';
  name: string;
  location: string;
  source?: number;
  config?: DocConfig;
};

export type DocFormatRecord = DocFormat & ObjectRecord;

export type DocConfig = {
  id?: number;
  selector_type?: 'element' | 'pattern';
  selector?: string;
  map?: Record<string, any>;
  js: boolean;
};

export type DocConfigRecord = DocConfig & ObjectRecord & {
  format: DocFormat;
};

export type Doc = {
  id?: number;
  key: string;
  data: any;
  type: string;
};

export type DocRecord = Doc & ObjectRecord;

export type TaskInput = {
  params?: string;
  steps: TaskStep[];
  format: number;
}

export type TaskScheduled = TaskInput & {
  id?: number;
  source: DocSource;
  format: DocFormat;
  params?: string;
  steps: TaskStep[];
  scheduled: string;
  output: TaskOutput[];
};

export type TaskScheduledRecord = TaskScheduled & ObjectRecord;

export type TaskStep = {
  id?: number;
  task?: TaskScheduled;
  position: number;
  agent: string;
  skill: string;
  params?: string;
  filters?: object[];
};

export type TaskStepRecord = TaskStep & ObjectRecord;

export type TaskOutput = {
	[key: string]: any;
};
