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
						title={ __( 'Nastavení Barev', 'text-domain-example' ) }
					>
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Textu', 'text-domain-example' ) }
							target="text_Color"
							default={ attributes.text_Color }
						/>
						<Divider />
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Pozadí', 'text-domain-example' ) }
							target="bg_Color"
							default={ attributes.bg_Color }
						/>
						<Divider />
						<NewColorPalette
							attributes={ attributes }
							setAttributes={ setAttributes }
							label={ __( 'Barva Okrajů', 'text-domain-example' ) }
							target="border_Color"
							default={ attributes.border_Color }
						/>
						<Divider />
						<RangeControl
							label={ __(
								'Tlouštka Okrajů',
								'text-domain-example'
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
						title={ __( 'Nastavení Odkazů', 'text-domain-example' ) }
					>
						<TextControl
							label={ __(
								'1. Slider - Odkaz',
								'text-domain-example'
							) }
							value={ attributes.href_1 }
							onChange={ ( val ) =>
								setAttributes( { href_1: val } )
							}
						/>
						<Divider />
						<TextControl
							label={ __(
								'2. Slider - Odkaz',
								'text-domain-example'
							) }
							value={ attributes.href_2 }
							onChange={ ( val ) =>
								setAttributes( { href_2: val } )
							}
						/>
						<Divider />
						<TextControl
							label={ __(
								'3. Slider - Odkaz',
								'text-domain-example'
							) }
							value={ attributes.href_3 }
							onChange={ ( val ) =>
								setAttributes( { href_3: val } )
							}
						/>
						<Divider />
						<TextControl
							label={ __(
								'4. Slider - Odkaz',
								'text-domain-example'
							) }
							value={ attributes.href_4 }
							onChange={ ( val ) =>
								setAttributes( { href_4: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<div
					{ ...useBlockProps( {
						className: 'slider-more-button',
					} ) }
				>
					<RichText
						tagName="a"
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
		const slidePointers = {
			1: attributes.href_1,
			2: attributes.href_2,
			3: attributes.href_3,
			4: attributes.href_4,
		};

		return (
			<div
				{ ...useBlockProps.save( {
					className: 'slider-more-button',
				} ) }
				data-slider-href={ JSON.stringify( slidePointers ) }
			>
				<a
					href={ attributes.href_1 }
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
