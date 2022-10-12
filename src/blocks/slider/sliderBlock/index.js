import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
const mainTemplate = [
	[ 'mchymcak/sliderimage' ],
	[ 'mchymcak/slidertext' ],
	[ 'mchymcak/sliderinfo' ],
	[ 'mchymcak/sliderbutton' ],
	[ 'mchymcak/slidertabs' ],
];

/**
 * InnerBlocks Allowed Blocks
 */
const allowedBlocks = [
	'mchymcak/sliderimage',
	'mchymcak/slidertext',
	'mchymcak/sliderinfo',
	'mchymcak/sliderbutton',
	'mchymcak/slidertabs',
];

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: () => {
		return (
			<div
				{ ...useBlockProps( {
					className: 'slider-block',
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
					className: 'slider-block',
				} ) }
			>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
