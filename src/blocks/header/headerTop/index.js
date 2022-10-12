import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal Data
 */
import metadata from './block.json';
import getAttributes from './attributes.json';

/**
 * InnerBlocks Template
 */
const mainTemplate = [
	[ 'mchymcak/headersearch' ],
	[ 'mchymcak/headercontact' ],
	[ 'mchymcak/headerlogin' ],
];

/**
 * InnerBlocks Allowed Blocks
 */
const allowedBlocks = [
	'mchymcak/headersearch',
	'mchymcak/headercontact',
	'mchymcak/headerlogin',
];

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: () => {
		return (
			<div
				{ ...useBlockProps( {
					className: 'header-top-menu',
				} ) }
			>
				<InnerBlocks
					template={ mainTemplate }
					allowedBlocks={ allowedBlocks }
				/>
			</div>
		);
	},
	save: () => {
		return (
			<div
				{ ...useBlockProps.save( {
					className: 'header-top-menu',
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
