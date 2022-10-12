import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { TextControl, PanelBody } from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
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
				<InspectorControls>
					<PanelBody
						initialOpen={ false }
						title={ __(
							'Nastavení Vyhledávání',
							'ant-studio-example'
						) }
					>
						<TextControl
							label={ __(
								'Vyhledávání Placeholder',
								'ant-studio-example'
							) }
							value={ attributes.search }
							onChange={ ( val ) =>
								setAttributes( { search: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls group="block" />
				<form
					action="/"
					method="get"
					{ ...useBlockProps( { className: 'header-search' } ) }
				>
					<input
						type="text"
						name="s"
						id="search"
						placeholder={ attributes.search }
					/>
					<button type="submit">
						<i className="fa fa-search" aria-hidden="true"></i>
					</button>
				</form>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<form
				action="/"
				method="get"
				{ ...useBlockProps.save( { className: 'header-search' } ) }
			>
				<input
					type="text"
					name="s"
					id="search"
					placeholder={ attributes.search }
				/>
				<button type="submit">
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
			</form>
		);
	},
} );
