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
  meta?: any;
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
  id: number;
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

type PropertyType = 'string' | 'number';

export type PropertySelectorMap = {
  property: string;
  selector: string;
  type: PropertyType;
}

export type DocConfig = {
  id?: number;
  selector_type?: 'element' | 'pattern';
  selector?: string;
  map: PropertySelectorMap[];
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

export type TaskScheduledIn = {
  id?: number;
  name?: number;
  steps?: TaskStep[];
  format?: number;
  source?: number;
  scheduled?: string;
}

enum units {
  'minute',
  'minutes',
  'hour',
  'hours',
  'week',
  'weeks',
  'month',
  'months'
};

type ValidUnits = keyof typeof units;

export type Recurrence = {
  unit: ValidUnits;
  value: number;
}

export type TaskScheduled = TaskScheduledIn & {
  source: DocSource;
  format: DocFormat;
  steps: TaskStep[];
  scheduled: string | null;
  interval: Recurrence,
  output: TaskOutput[];
};

export type TaskScheduledRecord = TaskScheduled & ObjectRecord & {
  id: number;
  steps: TaskStepRecord[];
};

export type TaskStep = {
  id?: number;
  task?: number;
  position: number;
  agent: string;
  skill: string;
  params?: string;
  filters?: object[];
};

export type TaskStepRecord = TaskStep & ObjectRecord & {
  task: TaskScheduled;
};

export type TaskOutput = ObjectRecord & {
  job: number;
  task: number;
  agent: string;
  skill: string;
  json?: TaskOutputJson;
  text?: string;
}

type TaskOutputResult = {
  match?: boolean;
  confidence: string;
  reasoning: string;
}

type TaskOutputMetadata = {
  source?: string;
  content?: any;
  result?: TaskOutputResult;
  preview?: TaskOutputResult; // legacy
  [key: string]: any;
}

export type TaskOutputJson = {
  pageContent: string;
  metadata: TaskOutputMetadata;
	[key: string]: any;
};

export interface GenericHandlerFn {
  (): Promise<any>;
}