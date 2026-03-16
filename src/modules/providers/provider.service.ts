import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { SuccessApiResponse } from "src/common/responses/api-response";
import { AppLogger } from "src/core/logger/logger.service";
import type { DB } from "../../core/db";
import { PayrollProviders } from "../../core/db/schema";

@Injectable()
export class ProviderService {
  constructor(
    @Inject("DRIZZLE_DB") private readonly db: DB,
    private readonly logger: AppLogger
  ) {}

  async findAll() {
    this.logger.log("Fetching providers..");

    // throw new ApiError("bad_request", "userid is required");

    // const user: any = null;
    // console.log({ name: user.name });

    const data = await this.db.select().from(PayrollProviders);

    return SuccessApiResponse("Fetched providers list", data);
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
