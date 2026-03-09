import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { PayrollProviders } from "../../core/db/schema";

@Injectable()
export class ProviderService {
  constructor(@Inject("DRIZZLE_DB") private readonly db: any) {}

  async findAll() {
    return await this.db.select().from(PayrollProviders);
  }

  async findById(id: string) {
    const result = await this.db.select().from(PayrollProviders).where(eq(PayrollProviders.id, id));

    return result[0];
  }

  async create(data: { name: string; shortId: string; logoUrl?: string; key?: string }) {
    const result = await this.db.insert(PayrollProviders).values(data).returning();

    return result[0];
  }

  async delete(id: string) {
    return await this.db
      .update(PayrollProviders)
      .set({ deletedAt: new Date() })
      .where(eq(PayrollProviders.id, id))
      .returning();
  }
}
