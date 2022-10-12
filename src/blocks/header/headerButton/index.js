import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody, RangeControl } from '@wordpress/components';
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
						<Divider />
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Pozadí', 'ant-studio-example' ) }
							target="bg_Color"
							default={ attributes.bg_Color }
						/>
						<Divider />
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Okrajů', 'ant-studio-example' ) }
							target="border_Color"
							default={ attributes.border_Color }
						/>
						<Divider />
						<RangeControl
							label={ __(
								'Tlouštka Okrajů',
								'ant-studio-example'
							) }
							value={ attributes.border_Width }
							onChange={ ( val ) =>
								setAttributes( { border_Width: val } )
							}
							min={ 0 }
							max={ 10 }
							initialPosition={ 1 }
							renderTooltipContent={ ( value ) => value + 'px' }
						/>
					</PanelBody>
					<PanelBody
						initialOpen={ false }
						title={ __( 'Nastavení Odkazu', 'ant-studio-example' ) }
					>
						<TextControl
							label={ __( 'Odkaz Href', 'ant-studio-example' ) }
							value={ attributes.href }
							onChange={ ( val ) =>
								setAttributes( { href: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<div
					{ ...useBlockProps( {
						className: 'header-special-button',
					} ) }
				>
					<RichText
						tagName="a"
						href={ attributes.href }
						allowedFormats={ [] }
						value={ attributes.text }
						onChange={ ( val ) => {
							setAttributes( { text: val } );
						} }
						style={ {
							backgroundColor: attributes.bg_Color,
							borderColor: attributes.border_Color,
							borderWidth: attributes.border_Width,
							color: attributes.text_Color,
						} }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div
				{ ...useBlockProps.save( {
					className: 'header-special-button',
				} ) }
			>
				<a
					href={ attributes.href }
					style={ {
						backgroundColor: attributes.bg_Color,
						borderColor: attributes.border_Color,
						borderWidth: attributes.border_Width,
						color: attributes.text_Color,
					} }
				>
					<RichText.Content value={ attributes.text } />
				</a>
			</div>
		);
	},
} );
