<?php
/**
 * Create Custom Post Type
 * 
 * Možnost přidat proper sklonovani
 *
 * @param string $singular
 * @param string $multiple
 * @param string $dashicon
 * @param string $textdomain
 * @param array $support
 * @param array $taxonomies
 * @return void
 */
function create_custom_post(string $singular, string $multiple, string $register_name, string $dashicon, string $textdomain='textdomain', array $support=array(), array $taxonomies=array()):void {

    // Labels
    $labels = array(
        'name' => __($multiple, 'Post Type General Name', $textdomain),
        'singular_name' => __($singular, 'Post Type Singular Name', $textdomain),
        'menu_name' => __($multiple, $textdomain),
        'name_admin_bar' => __($singular, $textdomain),
        'archives' => __($singular . ' Archives', $textdomain),
        'attributes' => __($singular . ' Attributes', $textdomain),
        'parent_item_colon' => __('Parent Network:', $textdomain),
        'all_items' => __('Všechny ' . $multiple, $textdomain),
        'add_new_item' => __('Nová ' . $singular, $textdomain),
        'add_new' => __('Přidat Nový', $textdomain),
        'new_item' => __('Nová ' . $singular, $textdomain),
        'edit_item' => __('Upravit ' . $singular, $textdomain),
        'update_item' => __('Aktualizovat ' . $singular, $textdomain),
        'view_item' => __('Zobrazit ' . $singular, $textdomain),
        'view_items' => __('Zobrazit ' . $multiple, $textdomain),
        'search_items' => __('Vyhledat ' . $multiple, $textdomain),
        'not_found' => __('Nenalezeno', $textdomain),
        'not_found_in_trash' => __('Nenalezeno v koši', $textdomain),
        'featured_image' => __('Obrázek', $textdomain),
        'set_featured_image' => __('Zvolit hlavní obrázek', $textdomain),
        'remove_featured_image' => __('Odebrat hlavní obrázek', $textdomain),
        'use_featured_image' => __('Použít jako hlavní obrázek', $textdomain),
        'insert_into_item' => __('Vložit k ' . $singular, $textdomain),
        'uploaded_to_this_item' => __('Nahrát k ' . $singular, $textdomain),
        'items_list' => __('Seznam ' . $multiple, $textdomain),
        'items_list_navigation' => __($multiple . ' navigation', $textdomain),
        'filter_items_list' => __('Vyfiltrovat ' . $multiple, $textdomain)
    );
    
    // Arguments
    $args = array(
        'label' => __($singular, $textdomain),
        'description' => __($multiple, $textdomain),
        'labels' => $labels,
        'menu_icon' => $dashicon,
        'supports' => $support,
        'taxonomies' => $taxonomies,
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'hierarchical' => false,
        'exclude_from_search' => true,
        'show_in_rest' => true,
        'publicly_queryable' => true,
        'capability_type' => 'post'
    );
    
    add_action(
        'init', 
        function() use ($register_name, $args) {
            register_post_type($register_name, $args);
        }, 
        1
    );
}