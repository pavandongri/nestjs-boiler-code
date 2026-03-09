CREATE TABLE "PayrollProviders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"shortId" text NOT NULL,
	"logoUrl" text,
	"key" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "PayrollProviders_name_unique" UNIQUE("name"),
	CONSTRAINT "PayrollProviders_shortId_unique" UNIQUE("shortId")
);
