CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_url" text NOT NULL,
	"shortener_url" text NOT NULL,
	"access_quantity" integer NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
