import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import IconArrowRight from '../../../svg/IconArrowRight';

/**
 * Internal Data
 */
import metadata from './block.json';
import getAttributes from './attributes.json';

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;

		return (
			<>
				<BlockControls group="block" />
				<div { ...useBlockProps( { className: 'slider-info' } ) }>
					<div className="slider-info-inner">
						<IconArrowRight />
						<RichText
							tagName="span"
							allowedFormats={ [] }
							value={ attributes.info }
							onChange={ ( val ) => {
								setAttributes( { info: val } );
							} }
						/>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'slider-info' } ) }>
				<div className="slider-info-inner">
					<IconArrowRight />
					<RichText.Content
						tagName="span"
						value={ attributes.info }
					/>
				</div>
			</div>
		);
	},
} );
