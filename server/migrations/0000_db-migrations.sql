CREATE TABLE `builds` (
	`buildId` integer NOT NULL,
	`startTime` text DEFAULT (CURRENT_TIMESTAMP),
	`endTime` text DEFAULT (CURRENT_TIMESTAMP),
	`caption` text NOT NULL,
	`command` text NOT NULL,
	`status` text NOT NULL,
	`errorsNumber` integer DEFAULT 0,
	`warningsNumber` integer DEFAULT 0
);
