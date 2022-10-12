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
const mainTemplate = [ [ 'core/navigation' ], [ 'mchymcak/headerbutton' ] ];

/**
 * InnerBlocks Allowed Blocks
 */
const allowedBlocks = [ 'core/navigation', 'mchymcak/headerbutton' ];

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: () => {
		return (
			<div
				{ ...useBlockProps( {
					className: 'header-bottom-menu',
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
					className: 'header-bottom-menu',
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
