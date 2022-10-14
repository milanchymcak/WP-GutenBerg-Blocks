window.addEventListener( 'load', () => {
	/**
	 * Sticky Header
	 */

	const stickyHeader = document.querySelector( '.header-front' );
	if (
		window.innerWidth > 768 &&
		stickyHeader !== undefined &&
		stickyHeader !== null
	) {
		window.addEventListener( 'scroll', () => {
			if (
				( document.documentElement.scrollTop ||
					document.body.scrollTop ) > stickyHeader.offsetHeight
			) {
				if ( ! stickyHeader.classList.contains( 'sticked' ) )
					stickyHeader.classList.add( 'sticked' );
			} else if ( stickyHeader.classList.contains( 'sticked' ) )
				stickyHeader.classList.remove( 'sticked' );
		} );
	}

	/**
	 * Admin Bar Fix
	 */

	const adminBar = document.querySelector( '#wpadminbar' );
	if (
		adminBar !== undefined &&
		adminBar !== null &&
		stickyHeader !== undefined &&
		stickyHeader !== null
	) {
		stickyHeader.style.paddingTop = adminBar.clientHeight + 'px';
	}

	/**
	 * Open Mobile Menu
	 */
	const mobileMenuButton = document.querySelector( '.header-mobile-menu' );
	if ( mobileMenuButton !== undefined && mobileMenuButton !== null ) {
		mobileMenuButton.onclick = () => {
			const targetMenu = document.querySelector( '.header-bottom-menu' );
			if ( targetMenu !== undefined && targetMenu !== null ) {
				targetMenu.classList.toggle( 'open-menu' );
			}
		};
	}

	/**
	 * Sliders
	 *
	 *
	 */

	// Global Timer
	let sliderTimer;

	// Global Slider Links
	let sliderLinks = {};

	const sliderButton = document.querySelector( '.slider-more-button' );
	if ( sliderButton !== undefined && sliderButton !== null ) {
		if ( sliderButton.hasAttribute( 'data-slider-href' ) ) {
			sliderLinks = JSON.parse(
				sliderButton.getAttribute( 'data-slider-href' )
			);
		}
	}

	// Switch Tab
	const switchTab = ( nextTarget ) => {
		// Text
		const sliderText = document.querySelector(
			'#slider-text-' + nextTarget
		);
		if ( sliderText !== undefined && sliderText !== null ) {
			// Hide all sliders
			const sliderTexts = document.querySelectorAll(
				'.slider-text-inner.active'
			);
			if ( sliderTexts !== undefined && sliderTexts !== null ) {
				sliderTexts.forEach( ( slider ) =>
					slider.classList.remove( 'active' )
				);
			}
			// Active the target slider
			sliderText.classList.add( 'active' );
		}

		// Tabs
		const sliderTab = document.querySelector( '#slider-tab-' + nextTarget );
		if ( sliderTab !== undefined && sliderTab !== null ) {
			// Not active all tabs
			const sliderTabsActive =
				document.querySelectorAll( '.slider-tab.active' );
			if ( sliderTabsActive !== undefined && sliderTabsActive !== null ) {
				sliderTabsActive.forEach( ( tab ) =>
					tab.classList.remove( 'active' )
				);
			}
			// Active the target tab
			sliderTab.classList.add( 'active' );
		}

		// Change More Info Link
		const sliderButtonHref = document.querySelector(
			'.slider-more-button a'
		);
		if ( sliderButtonHref !== undefined && sliderButtonHref !== null ) {
			sliderButtonHref.setAttribute( 'href', sliderLinks[ nextTarget ] );
		}
	};

	// Sliders Tabs By Click
	const sliderTabs = document.querySelectorAll( '.slider-tab' );
	if ( sliderTabs !== undefined && sliderTabs !== null ) {
		sliderTabs.forEach( ( sliderTab ) => {
			sliderTab.onclick = ( e ) => {
				const sliderTarget =
					e.target.getAttribute( 'data-slider-target' );

				// Swtich Tab
				switchTab( sliderTarget );
			};
		} );
	}

	// Sliders Tabs Automatically
	const autoSlider = () => {
		const sliderAutoTabs = document.querySelectorAll( '.slider-tab' );
		if ( sliderAutoTabs !== undefined && sliderAutoTabs !== null ) {
			for ( const sliderTab of sliderAutoTabs ) {
				if ( sliderTab.classList.contains( 'active' ) ) {
					const sliderTarget =
						sliderTab.getAttribute( 'data-slider-target' );
					let nextTarget = Number( sliderTarget ) + 1;
					if ( nextTarget > sliderAutoTabs.length ) nextTarget = 1;

					// Swtich Tab
					switchTab( nextTarget );

					break;
				}
			}
		}

		// Timeout
		if ( sliderTimer ) clearTimeout( sliderTimer );
		sliderTimer = setTimeout( () => autoSlider(), 6500 );
	};

	autoSlider();

	/**
	 * Contact Form Message
	 *
	 * @param  message
	 */
	const contactMessage = ( message ) => {
		const formMessage = document.querySelector( '.contact-message' );
		if ( formMessage !== undefined && formMessage !== null ) {
			formMessage.textContent = message;
			formMessage.style.display = 'block';
		}
	};

	/**
	 * Submit Contact Form
	 */
	const form = document.querySelector( '#contact' );
	if ( form !== undefined && form !== null ) {
		form.onsubmit = ( e ) => {
			e.preventDefault();

			const formData = new FormData( e.target );

			grecaptcha.ready( function () {
				grecaptcha
					.execute( '6LdwMnYiAAAAANcMWs9cI_h9V5wqM6xD178DL5lk', {
						action: 'submit',
					} )
					.then( function ( token ) {
						formData.append( 'grecaptcha', token );
						fetch( custom_data[ 'contact-api' ], {
							method: 'POST',
							body: formData,
						} )
							.then( ( res ) => res.text() )
							.then( ( data ) => contactMessage( data ) );
					} );
			} );
		};
	}
} );
