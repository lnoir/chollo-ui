export type AppModalType = 'component' | 'confirm' | 'prompt' | 'alert';
export type AppLevelType = 'info' | 'warn' | 'danger';

export type AppModalOptions = {
	title: string;
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

export type AppMessageOptions = AppModalOptions & {
	type?: AppLevelType;
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

// Types for DocSource
export type DocSource = {
  id: number;
  type: 'web' | 'drive' | 'text';
  name: string;
  location: string;
  formats: DocFormat[];
  created: string;
  updated?: string;
  deleted?: string;
};

// Types for DocFormat
export type DocFormat = {
  id: number;
  type: 'html' | 'json' | 'xml' | 'text';
  name: string;
  location: string;
  source: DocSource;
  config: DocConfig;
  created: string;
  updated?: string;
  deleted?: string;
};

// Types for DocConfig
export type DocConfig = {
  id: number;
  selector_type?: 'element' | 'pattern';
  selector?: string;
  map?: Record<string, any>;
  js: boolean;
  format: DocFormat;
  created: string;
  updated?: string;
  deleted?: string;
};

// Types for Doc
export type Doc = {
  id: number;
  key: string;
  data: string;
  type: string;
  created: string;
  updated?: string;
  deleted?: string;
};

// Types for TaskScheduled
export type TaskScheduled = {
  id: number;
  source: DocSource;
  format: DocFormat;
  params?: string;
  steps: TaskStep[];
  scheduled: string;
  output: TaskOutput[];
  created: string;
  updated?: string;
  deleted?: string;
};

// Types for TaskStep
export type TaskStep = {
  id: number;
  task: TaskScheduled;
  position: number;
  agent: string;
  skill: string;
  params?: string;
  filters?: object[];
  created: string;
  updated?: string;
  deleted?: string;
};

// Optional: Types for TaskOutput (Assuming you have a definition for it)
export type TaskOutput = {
  // Your fields here
	[key: string]: any;
};
