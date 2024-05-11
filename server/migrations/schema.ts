import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const builds = sqliteTable('builds', {
  id: integer('id'),
  buildId: text('buildId').notNull(),
  startTime: text('startTime').default('sql`(CURRENT_TIMESTAMP)`'),
  endTime: text('endTime').default('sql`(CURRENT_TIMESTAMP)`'),
  caption: text('caption').notNull(),
  command: text('command').notNull(),
  status: text('status').notNull(),
  errorsNumber: integer('errorsNumber').default(0),
  warningsNumber: integer('warningsNumber').default(0),
});
