import { pgTable, serial, varchar, text, integer, timestamp, json, boolean } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  name: varchar('name', { length: 255 }),
  avatarUrl: text('avatar_url'),
  provider: varchar('provider', { length: 50 }).default('email'),
  credits: integer('credits').default(0),
  createdAt: timestamp('created_at').defaultNow()
})

export const analyses = pgTable('analyses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  filename: varchar('filename', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).default('queued'),
  title: text('title'),
  authors: text('authors'),
  abstract: text('abstract'),
  keyFindings: text('key_findings'),
  methodology: text('methodology'),
  conclusions: text('conclusions'),
  limitations: text('limitations'),
  oneParagraph: text('one_paragraph'),
  keyConcepts: json('key_concepts'),
  videoPath: text('video_path'),
  slidesPath: text('slides_path'),
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
  errorMessage: text('error_message')
})

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  amount: integer('amount'),
  credits: integer('credits').notNull(),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
})

export const dailyCredits = pgTable('daily_credits', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  date: varchar('date', { length: 10 }).notNull(),
  claimed: boolean('claimed').default(false)
})
