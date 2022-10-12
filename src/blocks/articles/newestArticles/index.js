import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import Divider from '../../../components/Divider';

/**
 *
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './style.scss';

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
		 * Site Main Information
		 *
		 * WP 6.1 Should implement better method to get site data
		 */

		/**
		 * Posts
		 */
		const postData = wp.data.useSelect(
			( select ) => {
				return select( 'core' ).getEntityRecords(
					'postType',
					'udalosti',
					{
						per_page: attributes.max_articles,
						order: attributes.order,
					}
				);
			},
			[ attributes.max_articles, attributes.order ]
		);

		/**
		 * Get All Categories
		 */
		const catData = wp.data.useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'taxonomy', 'category' );
		}, [] );

		/**
		 * Get All Post Tags
		 */
		const tagsData = wp.data.useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'taxonomy', 'post_tag' );
		}, [] );

		useEffect( () => {
			/**
			 * Save Posts
			 */
			if (
				postData &&
				Object.entries( postData ).length > 0 &&
				( Object.entries( attributes.posts ).length === 0 ||
					postData !== attributes.posts )
			) {
				setAttributes( { posts: postData } );
			}

			/**
			 * Save All Cats
			 */
			if (
				catData &&
				Object.entries( catData ).length > 0 &&
				Object.entries( attributes.all_categories ).length === 0
			) {
				const betterCats = {};
				Object.values( catData ).forEach( ( cat ) => {
					betterCats[ cat.id ] = {
						id: cat.id,
						name: cat.name,
						link: cat.link,
					};
				} );
				setAttributes( { all_categories: betterCats } );
			}

			/**
			 * Save All Tags
			 */
			if (
				tagsData &&
				Object.entries( tagsData ).length > 0 &&
				Object.entries( attributes.all_tags ).length === 0
			) {
				const betterTags = {};
				Object.values( tagsData ).forEach( ( cat ) => {
					betterTags[ cat.id ] = {
						id: cat.id,
						name: cat.name,
						link: cat.link,
					};
				} );
				setAttributes( { all_tags: betterTags } );
			}

			/**
			 * Save Local Cats
			 */
			if (
				attributes.posts &&
				Object.entries( attributes.posts ).length > 0 &&
				attributes.all_categories &&
				Object.entries( attributes.all_categories ).length > 0
			) {
				Object.values( attributes.posts ).forEach( ( key ) => {
					const localCategories = {};
					key.categories.forEach( ( index ) => {
						localCategories[ index ] = {
							id: index,
							name: attributes.all_categories[ index ].name,
							href: attributes.all_categories[ index ].link,
						};
					} );
					if (
						localCategories &&
						Object.entries( localCategories ).length > 0
					) {
						setAttributes( { categories: localCategories } );
					}
				} );
			}

			/**
			 * Save Local Tags
			 */
			if (
				attributes.posts &&
				Object.entries( attributes.posts ).length > 0 &&
				attributes.all_tags &&
				Object.entries( attributes.all_tags ).length > 0
			) {
				Object.values( attributes.posts ).forEach( ( key ) => {
					const localTags = {};
					key.tags.forEach( ( index ) => {
						localTags[ index ] = {
							id: index,
							name: attributes.all_tags[ index ].name,
							href: attributes.all_tags[ index ].link,
						};
					} );
					if ( localTags && Object.entries( localTags ).length > 0 ) {
						setAttributes( { tags: localTags } );
					}
				} );
			}

			/**
			 * Save Custom Post Type Archive Link
			 */
			if (
				custom_data !== undefined &&
				custom_data !== null &&
				custom_data.udalosti_archive !== undefined &&
				custom_data.udalosti_archive !== null &&
				attributes.archive_link === ''
			) {
				setAttributes( {
					archive_link: custom_data.udalosti_archive,
				} );
			}
		}, [
			postData,
			catData,
			tagsData,
			attributes.all_categories,
			attributes.all_tags,
			attributes.max_articles,
			attributes.order,
		] );

		return (
			<>
				<InspectorControls>
					<PanelBody
						initialOpen={ true }
						title={ __( 'Nastavení Článků', 'ant-studio-example' ) }
					>
						<RangeControl
							label={ __( 'Počet Článků', 'ant-studio-example' ) }
							value={ attributes.max_articles }
							onChange={ ( val ) =>
								setAttributes( { max_articles: val } )
							}
							min={ 0 }
							max={ 12 }
							initialPosition={ 4 }
						/>
						<Divider />
						<SelectControl
							label={ __(
								'Seřazení Článků',
								'ant-studio-example'
							) }
							value={ attributes.order }
							options={ [
								{
									label: 'Od Nejnovějšího',
									value: 'desc',
								},
								{
									label: 'Od Nejstaršího',
									value: 'asc',
								},
							] }
							onChange={ ( val ) => {
								setAttributes( { order: val } );
							} }
							__nextHasNoMarginBottom
						/>
					</PanelBody>
				</InspectorControls>
				<div
					{ ...useBlockProps( {
						className: 'newest-articles',
					} ) }
				>
					<BlockControls group="block" />
					<div className="newest-header">
						<RichText
							tagName="h2"
							allowedFormats={ [] }
							value={ attributes.title }
							onChange={ ( val ) => {
								setAttributes( { title: val } );
							} }
						/>
						<RichText
							tagName="a"
							href={ attributes.archive_link }
							allowedFormats={ [] }
							value={
								attributes.archive_text +
								'<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
							}
							onChange={ ( val ) => {
								setAttributes( { archive_text: val } );
							} }
						/>
					</div>
					<div className="newest-items">
						{ Object.values( attributes.posts ).map( ( key ) => {
							const postCategories = key.categories;
							const postTags = key.tags;
							return (
								<div
									className="newest-item"
									key={ key.title.rendered }
								>
									<div className="newest-category">
										{ Object.values(
											attributes.all_categories
										).map( ( key, index ) => {
											if (
												postCategories &&
												postCategories.includes(
													key.id
												)
											) {
												return (
													<a
														href={ key.link }
														key={ key.name }
													>
														{ key.name }
													</a>
												);
											}
										} ) }
									</div>
									<div className="newest-date">
										{ key.date.replace( 'T', ' ' ) }
									</div>
									<div className="newest-title">
										{ key.title.rendered }
									</div>
									<RichText
										tagName="div"
										value={ key.excerpt.rendered }
										className="newest-excerpt"
									/>
									<div className="newest-tags">
										{ Object.values(
											attributes.all_tags
										).map( ( key, index ) => {
											if (
												postTags &&
												postTags.includes( key.id )
											) {
												return (
													<a
														href={ key.link }
														key={ key.name }
													>
														{ key.name }
													</a>
												);
											}
										} ) }
									</div>
									<div className="newest-link">
										<a
											href={ key.link }
											title={ key.title.rendered }
										>
											Přečíst Více
											<i
												className="fa fa-long-arrow-right"
												aria-hidden="true"
											></i>
										</a>
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<div
				{ ...useBlockProps.save( {
					className: 'newest-articles',
				} ) }
			>
				<div className="newest-header">
					<RichText.Content tagName="h2" value={ attributes.title } />
					<RichText.Content
						tagName="a"
						href={ attributes.archive_link }
						value={
							attributes.archive_text +
							'<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
						}
					/>
				</div>
				<div className="newest-items">
					{ Object.values( attributes.posts ).map( ( key ) => {
						const postCategories = key.categories;
						const postTags = key.tags;
						return (
							<div
								className="newest-item"
								key={ key.title.rendered }
							>
								<div className="newest-category">
									{ Object.values(
										attributes.all_categories
									).map( ( key, index ) => {
										if (
											postCategories &&
											postCategories.includes( key.id )
										) {
											return (
												<a
													href={ key.link }
													key={ key.name }
												>
													{ key.name }
												</a>
											);
										}
									} ) }
								</div>
								<div className="newest-date">
									{ key.date.replace( 'T', ' ' ) }
								</div>
								<div className="newest-title">
									{ key.title.rendered }
								</div>
								<RichText.Content
									tagName="div"
									value={ key.excerpt.rendered }
									className="newest-excerpt"
								/>
								<div className="newest-tags">
									{ Object.values( attributes.all_tags ).map(
										( key, index ) => {
											if (
												postTags &&
												postTags.includes( key.id )
											) {
												return (
													<a
														href={ key.link }
														key={ key.name }
													>
														{ key.name }
													</a>
												);
											}
										}
									) }
								</div>
								<div className="newest-link">
									<a
										href={ key.link }
										title={ key.title.rendered }
									>
										Přečíst Více
										<i
											className="fa fa-long-arrow-right"
											aria-hidden="true"
										></i>
									</a>
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},
} );
