import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import IconBars from '../../../svg/IconBars';

/**
 *
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';

/**
 * Internal Data
 */
import metadata from './block.json';
import getAttributes from './attributes.json';

/**
 * InnerBlocks Template
 */
const mainTemplate = [ [ 'mchymcak/headerlogo' ], [ 'mchymcak/headernav' ] ];

/**
 * InnerBlocks Allowed Blocks
 */
const allowedBlocks = [ 'mchymcak/headerlogo', 'mchymcak/headernav' ];

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: () => {
		return (
			<div
				{ ...useBlockProps( {
					className: 'header-block',
				} ) }
			>
				<div className="header-mobile-menu">
					<IconBars />
				</div>
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
					className: 'header-block header-front',
				} ) }
			>
				<div className="header-block-container">
					<div className="header-mobile-menu">
						<IconBars />
					</div>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
