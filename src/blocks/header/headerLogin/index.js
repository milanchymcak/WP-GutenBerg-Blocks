import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import NewColorPalette from '../../../components/NewColorPalette';
import IconArrowRight from '../../../svg/IconArrowRight';
import IconCircleInfo from '../../../svg/IconCircleInfo';

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
							label={ __( 'Barva Odkazu', 'text-domain-example' ) }
							target="text_Color"
							default={ attributes.text_Color }
						/>
					</PanelBody>
					<PanelBody
						initialOpen={ false }
						title={ __( 'Nastavení', 'text-domain-example' ) }
					>
						<TextControl
							label={ __( 'Odkaz Href', 'text-domain-example' ) }
							value={ attributes.href }
							onChange={ ( val ) =>
								setAttributes( { href: val } )
							}
						/>
						<TextControl
							label={ __(
								'Informace Tooltip',
								'text-domain-example'
							) }
							value={ attributes.login_title_info }
							onChange={ ( val ) =>
								setAttributes( { login_title_info: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<div { ...useBlockProps( { className: 'header-login' } ) }>
					<RichText
						tagName="div"
						className="header-login-sub-title"
						allowedFormats={ [] }
						value={ attributes.sub_title }
						onChange={ ( val ) => {
							setAttributes( { sub_title: val } );
						} }
					/>
					<div className="header-login-title">
						<RichText
							tagName="span"
							allowedFormats={ [] }
							value={ attributes.title }
							onChange={ ( val ) => {
								setAttributes( { title: val } );
							} }
						/>
						<IconCircleInfo title={ attributes.login_title_info } />
					</div>
					<div className="header-login-link-wrap">
						<a
							className="header-login-link"
							href={ attributes.href }
							style={ {
								color: attributes.text_Color,
							} }
						>
							<RichText
								tagName="span"
								allowedFormats={ [] }
								value={ attributes.link_text }
								onChange={ ( val ) => {
									setAttributes( { link_text: val } );
								} }
							/>
							<IconArrowRight />
						</a>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div { ...useBlockProps.save( { className: 'header-login' } ) }>
				<RichText.Content
					tagName="div"
					className="header-login-sub-title"
					value={ attributes.sub_title }
				/>
				<div className="header-login-title">
					<RichText.Content
						tagName="span"
						value={ attributes.title }
					/>
					<IconCircleInfo title={ attributes.login_title_info } />
				</div>
				<div className="header-login-link-wrap">
					<a
						className="header-login-link"
						href={ attributes.href }
						style={ {
							color: attributes.text_Color,
						} }
					>
						<RichText.Content value={ attributes.link_text } />
						<IconArrowRight />
					</a>
				</div>
			</div>
		);
	},
} );
