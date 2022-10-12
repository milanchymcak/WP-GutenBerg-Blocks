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
const mainTemplate = [ [ 'mchymcak/headertop' ], [ 'mchymcak/headerbottom' ] ];

/**
 * InnerBlocks Allowed Blocks
 */
const allowedBlocks = [ 'mchymcak/headertop', 'mchymcak/headerbottom' ];

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: () => {
		return (
			<div
				{ ...useBlockProps( {
					className: 'header-nav',
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
					className: 'header-nav',
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
