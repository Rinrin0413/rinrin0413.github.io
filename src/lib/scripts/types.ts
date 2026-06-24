export interface LicenseInfo {
	licenses: string | null;
	licenseText: string | null;
	url?: string;
	[key: string]: unknown;
}
