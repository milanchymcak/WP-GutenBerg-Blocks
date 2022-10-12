import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

import sliderImage from '../../../../public/assets/img/slider-img__krivky.svg';

/**
 * Internal Data
 */
import metadata from './block.json';
import getAttributes from './attributes.json';

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: ( props ) => {
		return (
			<>
				<BlockControls group="block" />
				<div { ...useBlockProps( { className: 'slider-image' } ) }>
					<img src={ sliderImage } alt="Slider" />
				</div>
			</>
		);
	},
	save: ( {} ) => {
		return (
			<div { ...useBlockProps.save( { className: 'slider-image' } ) }>
				<img src={ sliderImage } alt="Slider" />
			</div>
		);
	},
} );
