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

/**
 * Enqueue Global Vars - Admin
 */
add_action( 
	'admin_enqueue_scripts', 
	function () {
		wp_enqueue_script('public_script', ANT_URI .'public/assets/js/public.js', array(), '1.0', true);
		wp_localize_script(
			'public_script',
			'custom_data',
			[
				'admin-ajax' => admin_url('admin-ajax.php')
			]
		);
	}
);

/**
 * Enqueue Global Vars - Public
 */
add_action( 
	'wp_enqueue_scripts', 
	function () {
		wp_enqueue_script('public_script', ANT_URI .'public/assets/js/public.js', array(), '1.0', true);
		wp_localize_script(
			'public_script',
			'custom_data',
			[
				'admin-ajax' => admin_url('admin-ajax.php'),
				'contact-api' => ANT_URI . 'api/contact.php'
			]
		);
	}
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