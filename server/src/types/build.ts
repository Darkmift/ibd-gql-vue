import { type InferSelectModel } from 'drizzle-orm';
import { builds } from '@/drizzle/db/schema';

type BuildModel = InferSelectModel<typeof builds>;

export interface IBuild extends BuildModel {}