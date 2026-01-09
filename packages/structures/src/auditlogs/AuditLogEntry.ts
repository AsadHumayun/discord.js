import type { APIAuditLogEntry } from 'discord-api-types/v10';
import { Structure } from '../Structure.js';
import { kData } from '../utils/symbols.js';
import type { Partialize } from '../utils/types.js';

/**
 * Represents an audit log entry on Discord.
 *
 * @typeParam Omitted - Specify the properties that will not be stored in the raw data field as a union, implement via `DataTemplate`
 * @remarks has substructures `AuditLogChange`, `OptionalAuditEntryInfo` which need to be instantiated and stored by an extending class using it
 */
export class AuditLog<Omitted extends keyof APIAuditLogEntry | '' = ''> extends Structure<APIAuditLogEntry, Omitted> {
	/**
	 * The template used for removing data from the raw data stored for each audit log entry
	 */
	public static override DataTemplate: Partial<APIAuditLogEntry> = {};

	/**
	 * @param data - The raw data received from the API for the audit log entry
	 */
	public constructor(data: Partialize<APIAuditLogEntry, Omitted>) {
		super(data);
	}

	/**
	 * Id of the affected entity (webhook, user, role, etc.)
	 */
	public get targetId() {
		return this[kData].target_id;
	}

	/**
	 * User or app that made the changes
	 */
	public get userId() {
		return this[kData].user_id;
	}

	/**
	 * Id of the entry
	 */
	public get id() {
		return this[kData].id;
	}

	/**
	 * Type of action that occurred
	 *
	 * @see https://discord.com/developers/docs/resources/audit-log#audit-log-entry-object-audit-log-events
	 */
	public get actionType() {
		return this[kData].action_type;
	}

	/**
	 * Reason for the change
	 *
	 * @remarks 1-512 characters
	 */
	public get reason() {
		return this[kData].reason;
	}
}
