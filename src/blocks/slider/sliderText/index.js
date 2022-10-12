import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextareaControl, PanelBody } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import NewColorPalette from '../../../components/NewColorPalette';
import Divider from '../../../components/Divider';

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
				<InspectorControls>
					<PanelBody
						initialOpen={ false }
						title={ __( 'Nastavení Barev', 'ant-studio-example' ) }
					>
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Textu', 'ant-studio-example' ) }
							target="text_Color"
							default={ attributes.text_Color }
						/>
					</PanelBody>
					<PanelBody
						initialOpen={ false }
						title={ __( 'Slider Text', 'ant-studio-example' ) }
					>
						<TextareaControl
							label={ __( '1. Slider', 'ant-studio-example' ) }
							value={ attributes.slider_1
								.replace( '<br />', '\n' )
								.replace( '<br>', '\n' ) }
							onChange={ ( val ) =>
								setAttributes( {
									slider_1: val.replace( '\n', '<br />' ),
								} )
							}
						/>
						<Divider />
						<TextareaControl
							label={ __( '2. Slider', 'ant-studio-example' ) }
							value={ attributes.slider_2
								.replace( '<br />', '\n' )
								.replace( '<br>', '\n' ) }
							onChange={ ( val ) =>
								setAttributes( {
									slider_2: val.replace( '\n', '<br />' ),
								} )
							}
						/>
						<Divider />
						<TextareaControl
							label={ __( '3. Slider', 'ant-studio-example' ) }
							value={ attributes.slider_3
								.replace( '<br />', '\n' )
								.replace( '<br>', '\n' ) }
							onChange={ ( val ) =>
								setAttributes( {
									slider_3: val.replace( '\n', '<br />' ),
								} )
							}
						/>
						<Divider />
						<TextareaControl
							label={ __( '4. Slider', 'ant-studio-example' ) }
							value={ attributes.slider_4
								.replace( '<br />', '\n' )
								.replace( '<br>', '\n' ) }
							onChange={ ( val ) =>
								setAttributes( {
									slider_4: val.replace( '\n', '<br />' ),
								} )
							}
						/>
						<Divider />
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<div { ...useBlockProps( { className: 'slider-text' } ) }>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.slider_1 }
						id="slider-text-1"
						className="slider-text-inner active"
						preserveWhiteSpace={ true }
						onChange={ ( val ) => {
							setAttributes( { slider_1: val } );
						} }
					/>
					<div
						style={ {
							display: 'none',
						} }
					>
						<RichText
							tagName="div"
							allowedFormats={ [] }
							value={ attributes.slider_2 }
							id="slider-text-2"
							className="slider-text-inner"
							preserveWhiteSpace={ true }
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
							preserveWhiteSpace={ true }
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
							preserveWhiteSpace={ true }
							onChange={ ( val ) => {
								setAttributes( { slider_4: val } );
							} }
						/>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'slider-text' } ) }>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_1.replace( '\n', '<br />' ) }
					id="slider-text-1"
					className="slider-text-inner active"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_2.replace( '\n', '<br />' ) }
					id="slider-text-2"
					className="slider-text-inner"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_3.replace( '\n', '<br />' ) }
					id="slider-text-3"
					className="slider-text-inner"
				/>
				<RichText.Content
					tagName="div"
					value={ attributes.slider_4.replace( '\n', '<br />' ) }
					id="slider-text-4"
					className="slider-text-inner"
				/>
			</div>
		);
	},
} );
