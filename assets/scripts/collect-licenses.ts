import { writeFile } from 'node:fs/promises';
import { getDependencies, getLicenseText } from '@quantco/pnpm-licenses';

interface GeneratedLicenseInfo {
	licenses: string | null;
	licenseText: string | null;
	url?: string;
}

const deps = await getDependencies(
	{ prod: true },
	{
		stdin: false,
		stdout: false,
		inputFile: undefined,
		outputFile: ''
	}
);

const records = await Promise.all(
	deps.map(async (dep) => {
		let licenseText: string | null = null;

		try {
			const license = await getLicenseText(dep);
			licenseText = license.licenseText;
		} catch (error) {
			if (!isMissingLicenseError(error)) throw error;
		}

		return {
			id: `${dep.name}@${dep.version}`,
			license: {
				licenses: dep.license,
				licenseText,
				url: dep.homepage
			} satisfies GeneratedLicenseInfo
		};
	})
);

records.sort((left, right) => left.id.localeCompare(right.id, 'en'));

const output = Object.fromEntries(records.map(({ id, license }) => [id, license]));

await writeFile('src/lib/licenses.json', JSON.stringify(output, null, 2) + '\n');

console.log('Successfully generated src/lib/licenses.json');

function isMissingLicenseError(error: unknown): boolean {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof error.message === 'string' &&
		error.message.startsWith('No license text found for dependency ')
	);
}
