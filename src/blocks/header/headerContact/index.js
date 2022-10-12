import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import NewColorPalette from '../../../components/NewColorPalette';

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
							label={ __(
								'Barva Tel. Čísla',
								'ant-studio-example'
							) }
							target="text_Color"
							default={ attributes.text_Color }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<div { ...useBlockProps( { className: 'header-contact' } ) }>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.title }
						className="header-contact-title"
						onChange={ ( val ) => {
							setAttributes( { title: val } );
						} }
					/>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.phone }
						className="header-contact-phone"
						onChange={ ( val ) => {
							setAttributes( { phone: val } );
						} }
						style={ {
							color: attributes.text_Color,
						} }
					/>
					<RichText
						tagName="div"
						allowedFormats={ [] }
						value={ attributes.opening_hours }
						className="header-contact-title"
						onChange={ ( val ) => {
							setAttributes( { opening_hours: val } );
						} }
					/>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'header-contact' } ) }>
				<RichText.Content
					tagName="div"
					className="header-contact-title"
					value={ attributes.title }
				/>
				<a
					href={ 'tel:' + attributes.phone.replace( / /g, '' ) }
					className="header-contact-phone"
					style={ {
						color: attributes.text_Color,
					} }
				>
					<RichText.Content value={ attributes.phone } />
				</a>
				<RichText.Content
					tagName="div"
					className="header-contact-title"
					value={ attributes.opening_hours }
				/>
			</div>
		);
	},
} );
