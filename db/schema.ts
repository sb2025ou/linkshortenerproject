import { pgTable, integer, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export const links = pgTable(
  'links',
  {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
    originalUrl: text('original_url').notNull(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
    shortCodeIdx: index('short_code_idx').on(table.shortCode),
  })
);

// Export TypeScript types for type-safe database operations
export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
