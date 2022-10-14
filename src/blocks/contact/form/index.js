import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import IconArrowRight from '../../../svg/IconArrowRight';

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

		return (
			<>
				<div
					{ ...useBlockProps( {
						className: 'contact-form-container',
					} ) }
				>
					<BlockControls group="block" />
					<div className="contact-form">
						<RichText
							tagName="div"
							className="mini_title"
							allowedFormats={ [] }
							value={ attributes.mini_title }
							onChange={ ( val ) => {
								setAttributes( { mini_title: val } );
							} }
						/>
						<div className="title-container">
							<RichText
								tagName="div"
								className="title"
								allowedFormats={ [] }
								value={ attributes.title }
								onChange={ ( val ) => {
									setAttributes( { title: val } );
								} }
							/>
							<RichText
								tagName="div"
								className="sub-title"
								allowedFormats={ [] }
								value={ attributes.sub_title }
								onChange={ ( val ) => {
									setAttributes( { sub_title: val } );
								} }
							/>
						</div>
						<RichText
							tagName="div"
							className="description"
							allowedFormats={ [] }
							value={ attributes.description }
							onChange={ ( val ) => {
								setAttributes( { description: val } );
							} }
						/>
						<form id="contact">
							<RichText
								tagName="div"
								allowedFormats={ [] }
								value={ attributes.form_name }
								onChange={ ( val ) => {
									setAttributes( { form_name: val } );
								} }
							/>
							<RichText
								tagName="div"
								allowedFormats={ [] }
								value={ attributes.form_email }
								onChange={ ( val ) => {
									setAttributes( { form_email: val } );
								} }
							/>
							<RichText
								tagName="div"
								allowedFormats={ [] }
								value={ attributes.form_tel }
								onChange={ ( val ) => {
									setAttributes( { form_tel: val } );
								} }
							/>
							<RichText
								tagName="div"
								allowedFormats={ [] }
								value={ attributes.form_company }
								onChange={ ( val ) => {
									setAttributes( { form_company: val } );
								} }
							/>
							<RichText
								tagName="div"
								allowedFormats={ [] }
								value={ attributes.form_message }
								onChange={ ( val ) => {
									setAttributes( { form_message: val } );
								} }
							/>
							<div className="end-form">
								<div className="disclaimer">
									Tato stránka je chráněna pomocí reCAPTCHA a
									platí na ni{ ' ' }
									<a href="https://policies.google.com/privacy">
										zásady ochrany osobních údajů
									</a>{ ' ' }
									a{ ' ' }
									<a href="https://policies.google.com/terms">
										podmínky služby Google
									</a>
									. <br />
									Odesláním zprávy beru na vědomí zpracování
									osobních údajů.
								</div>
								<button className="g-recaptcha">
									<RichText
										allowedFormats={ [] }
										value={
											attributes.form_send
										}
										onChange={ ( val ) => {
											setAttributes( { form_send: val } );
										} }
									/>
									<IconArrowRight />
								</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	},
	save: ( { attributes } ) => {
		return (
			<>
				<div
					{ ...useBlockProps.save( {
						className: 'contact-form-container',
					} ) }
				>
					<div className="contact-form">
						<div
							className="contact-message"
							style="display: none"
						></div>
						<RichText.Content
							tagName="div"
							className="mini_title"
							value={ attributes.mini_title }
						/>
						<div className="title-container">
							<RichText.Content
								tagName="div"
								className="title"
								value={ attributes.title }
							/>
							<RichText.Content
								tagName="div"
								className="sub-title"
								value={ attributes.sub_title }
							/>
						</div>
						<RichText.Content
							tagName="div"
							className="description"
							value={ attributes.description }
						/>
						<form id="contact">
							<RichText.Content
								tagName="input"
								placeholder={ attributes.form_name }
								required
								name="name"
								type="text"
							/>
							<RichText.Content
								tagName="input"
								placeholder={ attributes.form_email }
								required
								name="email"
								type="email"
							/>
							<RichText.Content
								tagName="input"
								placeholder={ attributes.form_tel }
								required
								name="tel"
								type="tel"
								pattern="[0-9]{9}"
							/>
							<RichText.Content
								tagName="input"
								placeholder={ attributes.form_company }
								name="company"
								type="text"
							/>
							<RichText.Content
								tagName="textarea"
								placeholder={ attributes.form_message }
								name="message"
								rows="4"
							/>
							<div className="end-form">
								<div className="disclaimer">
									Tato stránka je chráněna pomocí reCAPTCHA a
									platí na ni{ ' ' }
									<a href="https://policies.google.com/privacy">
										zásady ochrany osobních údajů
									</a>{ ' ' }
									a{ ' ' }
									<a href="https://policies.google.com/terms">
										podmínky služby Google
									</a>
									. <br />
									Odesláním zprávy beru na vědomí zpracování
									osobních údajů.
								</div>
								<button className="g-recaptcha">
									{ attributes.form_send }
									<IconArrowRight />
								</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	},
} );
