import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';

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
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={
							attributes.info
						}
						className="slider-info-inner"
						onChange={ ( val ) => {
							setAttributes( { info: val } );
						} }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'slider-info' } ) }>
				<RichText.Content
					tagName="div"
					className="slider-info-inner"
					value={
						'<i class="fa fa-long-arrow-right" aria-hidden="true"></i>' +
						attributes.info
					}
				/>
			</div>
		);
	},
} );
