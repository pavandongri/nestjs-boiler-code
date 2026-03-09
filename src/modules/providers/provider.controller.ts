import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ProviderService } from "./provider.service";

@Controller("providers")
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  getAllProviders() {
    return this.providerService.findAll();
  }

  @Get(":id")
  getProviderById(@Param("id") id: string) {
    return this.providerService.findById(id);
  }

  @Post()
  createProvider(
    @Body()
    body: {
      name: string;
      shortId: string;
      logoUrl?: string;
      key?: string;
    }
  ) {
    return this.providerService.create(body);
  }

  @Delete(":id")
  deleteProvider(@Param("id") id: string) {
    return this.providerService.delete(id);
  }
}
