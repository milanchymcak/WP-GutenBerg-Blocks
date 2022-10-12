import { registerBlockType } from '@wordpress/blocks';
import { useEffect } from '@wordpress/element';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';

import logo from '../../../../public/assets/img/alfasoftware-logo.svg';
import smallLogo from '../../../../public/assets/img/alfasoftware-logo-small.svg';

/**
 * Internal Data
 */
import metadata from './block.json';
import getAttributes from './attributes.json';

registerBlockType( metadata.name, {
	attributes: getAttributes,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;

		/**
		 * Get Site Information
		 */
		const siteData = wp.data.useSelect( ( select ) => {
			return select( 'core' ).getSite();
		}, [] );

		useEffect( () => {
			/**
			 * Save Data
			 */
			if (
				siteData &&
				Object.entries( siteData ).length > 0 &&
				( Object.entries( attributes.site_data ).length === 0 ||
					siteData !== attributes.site_data )
			) {
				setAttributes( { site_data: siteData } );
				setAttributes( { title: siteData.title } );
				setAttributes( { description: siteData.description } );
				setAttributes( { url: siteData.url } );
			}
		}, [ siteData, attributes.site_data ] );

		return (
			<>
				<BlockControls />
				<div
					{ ...useBlockProps( {
						className: 'logo-area',
					} ) }
				>
					<a href={ attributes.url } title={ attributes.title }>
						<img
							src={ logo }
							alt={ attributes.description }
							className="logo"
						/>
						<img
							src={ smallLogo }
							alt={ attributes.description }
							className="small-logo"
						/>
					</a>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<>
				<div
					{ ...useBlockProps.save( {
						className: 'logo-area',
					} ) }
				>
					<a href={ attributes.url } title={ attributes.title }>
						<img
							src={ logo }
							alt={ attributes.description }
							className="logo"
						/>
						<img
							src={ smallLogo }
							alt={ attributes.description }
							className="small-logo"
						/>
					</a>
				</div>
			</>
		);
	},
} );
