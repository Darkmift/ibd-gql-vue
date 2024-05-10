import { sql } from 'drizzle-orm';
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

type StatusCol = (string & 'success') | 'failed' | 'cancelled';

// Builds Table
export const builds = sqliteTable('builds', {
  buildId: integer('buildId').notNull(),
  startTime: text('startTime').default(sql`(CURRENT_TIMESTAMP)`),
  endTime: text('endTime').default(sql`(CURRENT_TIMESTAMP)`),
  caption: text('caption').notNull(),
  command: text('command').notNull(),
  status: text('status').$type<StatusCol>().notNull(), //success, failed, cancelled
  errorsNumber: integer('errorsNumber').default(0),
  warningsNumber: integer('warningsNumber').default(0),
});
