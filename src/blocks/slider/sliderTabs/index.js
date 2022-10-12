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
				<div { ...useBlockProps( { className: 'slider-tabs' } ) }>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.slider_1 }
						id="slider-text-1"
						className="slider-text-inner"
						onChange={ ( val ) => {
							setAttributes( { slider_1: val } );
						} }
					/>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.slider_2 }
						id="slider-text-2"
						className="slider-text-inner"
						onChange={ ( val ) => {
							setAttributes( { slider_2: val } );
						} }
					/>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.slider_3 }
						id="slider-text-3"
						className="slider-text-inner"
						onChange={ ( val ) => {
							setAttributes( { slider_3: val } );
						} }
					/>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.slider_4 }
						id="slider-text-4"
						className="slider-text-inner"
						onChange={ ( val ) => {
							setAttributes( { slider_4: val } );
						} }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'slider-tabs' } ) }>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_1 }
					className="slider-tab active"
					id="slider-tab-1"
					data-slider-target="1"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_2 }
					className="slider-tab"
					id="slider-tab-2"
					data-slider-target="2"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_3 }
					className="slider-tab"
					id="slider-tab-3"
					data-slider-target="3"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_4 }
					className="slider-tab"
					id="slider-tab-4"
					data-slider-target="4"
				/>
			</div>
		);
	},
} );
