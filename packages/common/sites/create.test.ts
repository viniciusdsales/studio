import { describe, expect, it } from 'vitest';
import { buildSiteCreateArgs } from './create';

// Reads a flag's value out of the built argv (the token right after `--<name>`).
function argValue( args: string[], flag: string ): string | undefined {
	const index = args.indexOf( flag );
	return index === -1 ? undefined : args[ index + 1 ];
}

describe( 'buildSiteCreateArgs', () => {
	it( 'appends --flow-type when a flowType is provided', () => {
		const { args } = buildSiteCreateArgs( { path: '/tmp/site', flowType: 'import' } );

		expect( argValue( args, '--flow-type' ) ).toBe( 'import' );
	} );

	it( 'omits --flow-type when no flowType is provided', () => {
		const { args } = buildSiteCreateArgs( { path: '/tmp/site' } );

		expect( args ).not.toContain( '--flow-type' );
	} );

	it( 'appends --from-git, --sql and --remote-uploads-url when provided', () => {
		const { args } = buildSiteCreateArgs( {
			path: '/tmp/site',
			fromGit: 'git@example.com:acme/site.git',
			sqlImportPath: '/tmp/dump.sql',
			remoteUploadsUrl: 'https://cliente.com.br',
		} );

		expect( argValue( args, '--from-git' ) ).toBe( 'git@example.com:acme/site.git' );
		expect( argValue( args, '--sql' ) ).toBe( '/tmp/dump.sql' );
		expect( argValue( args, '--remote-uploads-url' ) ).toBe( 'https://cliente.com.br' );
	} );

	it( 'omits the migration flags when not provided', () => {
		const { args } = buildSiteCreateArgs( { path: '/tmp/site' } );

		expect( args ).not.toContain( '--from-git' );
		expect( args ).not.toContain( '--sql' );
		expect( args ).not.toContain( '--remote-uploads-url' );
	} );
} );
