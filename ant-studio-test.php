<?php
/**
 * Plugin Name:       Ant Studio Test
 * Description:       Test Plugin
 * Requires at least: 5.6
 * Requires PHP:      7.3
 * Version:           1.0
 * Author:            Milan Chymčák
 * Author URI:        https://chymcakmilan.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ant-studio-example
 *
 * @package           ant-studio-example
 */

/**
 * Globals
 */
define('ANT_PATH', plugin_dir_path( __FILE__ ));
define('ANT_URI', plugin_dir_url( __FILE__ ));

/**
 * Enqueue Global Scripts - Gutenberg Editor
 */
add_action( 
	'enqueue_block_editor_assets', 
	function () {
		/**
		 * Admin Scripts
		 */
		wp_enqueue_script( 'public_script', ANT_URI .'public/assets/js/public.js', array(), '1.0', true );
		wp_localize_script(
			'public_script',
			'custom_data',
			[
				'udalosti_archive' => get_post_type_archive_link( 'udalosti' ),

			]
		);
	},
	1
);

/**
 * Global Styles - Gutenberg
 */
add_action( 
	'after_setup_theme', 
	function () {
		add_editor_style(ANT_URI .'public/assets/css/global.css');

		/**
		 * 
		 * Add Development Compability
		 * See https://github.com/WordPress/gutenberg/issues/44951
		 * 
		 */
		// add_editor_style( 'https://milanchymcak.mravenec.eu/wp-content/plugins/ant-studio-test/public/assets/css/global.css' );
	}
);

/**
 * Enqueue Global Scripts - Public
 */
add_action( 
	'wp_enqueue_scripts', 
	function () {
		/**
		 * Global Styles
		 */
		wp_enqueue_style( 'global-style', ANT_URI .'public/assets/css/global.css' );

		/**
		 * Public Scripts
		 */
		wp_enqueue_script('public_script', ANT_URI .'public/assets/js/public.js', array(), '1.0', true);
		wp_localize_script(
			'public_script',
			'custom_data',
			[
				'contact-api' => ANT_URI . 'api/contact.php'
			]
		);
	},
	1
);

/**
 * Include Custom Post Type Builder
 * Create Události Custom Post Type
 */
include ANT_PATH . '/inc/custom_type.php';
if(function_exists('create_custom_post')) {
	create_custom_post(
		'Událost', 
		'Události', 
		'udalosti',
		'dashicons-megaphone', 
		'ant-studio-example', 
		array('title', 'editor', 'excerpt'),
		array('post_tag', 'category')
	);
}

/**
 * Loop Through All WP Blocks & Register Them
 */
add_action(
	'init', 
	function () {
		foreach (glob( __DIR__  . '/build/blocks/*/*/' ) as $block_type) {
			register_block_type($block_type);
		}
	}
);