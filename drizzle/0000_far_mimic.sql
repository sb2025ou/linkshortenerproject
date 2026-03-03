CREATE TABLE "links" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_code" varchar(10) NOT NULL,
	"original_url" text NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "links" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "short_code_idx" ON "links" USING btree ("short_code");