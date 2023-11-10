export const DB_FILENAME = 'chollo_ui.db';

export const DB_CREATE_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    value TEXT DEFAULT "0",
    defaultVal TEXT DEFAULT "0"
  )`
];

export const sourceKey = Symbol();
export const formatKey = Symbol();

export const APP_EVENTS = {
  SOURCES_REFRESH: 'sources:refresh',
  TASKS_REFRESH: 'tasks:refresh',
  DRAWER_OPEN: 'drawer:open',
  DRAWER_CLOSE: 'drawer:close',
  DIALOG_OPEN: 'dialog:open',
  DIALOG_CLOSE: 'dialog:close',
};

export const DRAWER_IDS = {
  SOURCE_FORM: 'source-form',
  FORMAT_FORM: 'format-form',
  CONFIG_FORM: 'config-form',
  TASK_FORM: 'task-form',
  STEP_FORM: 'step-form',
};

// @TODO: load this data from the API
export const AGENTS = {
  JOB: {
    name: 'Job', 
    value: 'job',
    skills: [
      { name: 'Job-Matching', value: 'runJobSkillMatchingAgent' },
      { name: 'Cover Letter', value: 'runCoverLetterWriterAgent' },
    ]
  }
}