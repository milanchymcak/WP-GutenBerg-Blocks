<?php
/**
 * Plugin Name:       Gutenberg Custom Blocks - Test
 * Description:       Test Plugin
 * Requires at least: 5.6
 * Requires PHP:      7.3
 * Version:           1.0
 * Author:            Milan Chymčák
 * Author URI:        https://chymcakmilan.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       text-domain-example
 */

/*
 * Globals
 */
define( 'TEST_PATH', plugin_dir_path( __FILE__ ) );
define( 'TEST_URI', plugin_dir_url( __FILE__ ) );

/*
 * Enqueue Global Scripts - Gutenberg Editor
 */
add_action(
    'enqueue_block_editor_assets',
    function () {
        /*
         * Admin Scripts
         */
        wp_enqueue_script( 'public_script', TEST_URI . 'public/assets/js/public.js', [], '1.0', true );
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

/*
 * Global Styles - Gutenberg
 */
add_action(
    'after_setup_theme',
    function () {
        add_editor_style( TEST_URI . 'public/assets/css/global.css' );
    }
);

/*
 * Enqueue Global Scripts - Public
 */
add_action(
    'wp_enqueue_scripts',
    function () {
        /*
         * Global Styles
         */
        wp_enqueue_style( 'global-style', TEST_URI . 'public/assets/css/global.css' );

        /*
         * Public Scripts
         */
        wp_enqueue_script( 'public_script', TEST_URI . 'public/assets/js/public.js', [], '1.0', true );
        wp_localize_script(
            'public_script',
            'custom_data',
            [
                'contact-api' => TEST_URI . 'api/contact.php',
            ]
        );
    },
    1
);

/**
 * Include Custom Post Type Builder
 * Create Události Custom Post Type
 */
include TEST_PATH . '/inc/custom_type.php';

if ( function_exists( 'create_custom_post' ) ) {
    create_custom_post(
        'Událost',
        'Události',
        'udalosti',
        'dashicons-megaphone',
        'text-domain-example',
        ['title', 'editor', 'excerpt'],
        ['post_tag', 'category']
    );
}

/*
 * Loop Through All WP Blocks & Register Them
 */
add_action(
    'init',
    function () {
        foreach ( glob( __DIR__ . '/build/blocks/*/*/' ) as $block_type ) {
            /*
             * Dynamic Blocks
             */
            if ( str_contains( $block_type, 'newestArticles' ) ) {
                /**
                 * Get Default Values From Attributes.json
                 *
                 * By Default Gutenberg shows default values only on client side thus there attributes are not available on the server rendering through render_callback
                 * By modifying webpack config we can build our attributes.json which we can extract values from
                 */
                $default_attributes = json_decode( file_get_contents( $block_type . 'attributes.json' ), true );

                /*
                 * Register Block Type
                 * Dynamic Block
                 */
                register_block_type( $block_type, [
                    'attributes'      => $default_attributes,
                    'render_callback' => function ( $attributes, $content, $block ) use ( $block_type ) {
                        if ( file_exists( $block_type . 'render.php' ) ) {
                            /**
                             * Simulating ...useBlockProps.save() with the class name
                             */
                            $block_content = '<div class="wp-block-' . str_replace( '/', '-', $block->parsed_block['blockName'] ) . ' newest-articles">';
                            $block_content .= include $block_type . 'render.php';
                            $block_content .= '</div>';

                            return $block_content;
                        }
                    },
                ] );
                continue;
            }

            /*
             * Static Blocks
             */
            register_block_type( $block_type );
        }
    }
);