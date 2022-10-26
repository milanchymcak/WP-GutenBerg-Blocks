<?php 
/**
 * SVG Icons
 */
$render_icon_arrow_right = file_get_contents(ANT_URI . 'public/assets/img/iconArrowRight.svg');

/**
 * Save Render Content
 */
$render_content = '';

/**
 * Headline
 */
$render_content .= '<div class="newest-header">';
    $render_content .= '<h2>' . $attributes['title'] . '</h2>';
    $render_content .= '<a href="' . get_post_type_archive_link( 'udalosti' ) . '">'; // Server Side Rendered Attribute
        $render_content .= '<span>' . $attributes['archive_text'] . '</span>';
        $render_content .= $render_icon_arrow_right;
    $render_content .= '</a>';
$render_content .= '</div>';

/**
 * Loop Items
 */

$render_content .= '<div class="newest-items">';

$render_query = new WP_Query([
    'posts_per_page' => $attributes['max_articles'],
    'order' => $attributes['order'],
    'post_status' => 'publish',
    'post_type' => array('udalosti')
]); while ($render_query->have_posts()) : $render_query->the_post();

$render_content .= '<div class="newest-item">';

    // Category
    $render_categories = get_the_category();
    $render_category = reset($render_categories);

    if(!empty($render_category)) {
        $render_content .= '<div class="newest-category">';
            $render_content .= '<a href="' . get_category_link($render_category->term_id) . '">';
                $render_content .= $render_category->name;
            $render_content .= '</a>';
        $render_content .= '</div>';
    }

    // Date
    $render_content .= '<div class="newest-date">';
        $render_content .= get_the_date();
    $render_content .= '</div>';

    // Title
    $render_content .= '<div class="newest-title">';
        $render_content .= get_the_title();
    $render_content .= '</div>';

    // Excerpt
    $render_content .= '<div class="newest-excerpt">';
        $render_content .= '<p>' . get_the_excerpt() . '</p>';
    $render_content .= '</div>';

    // Post Tags
    $render_tags = get_the_tags();

    if(!empty($render_tags)) {
        $render_content .= '<div class="newest-tags">';
            foreach($render_tags as $render_tag) {
                $render_content .= '<a href="' . get_tag_link($render_tag->term_id) . '">';
                    $render_content .= $render_tag->name;
                $render_content .= '</a>';  
            }
        $render_content .= '</div>';
    }

    // Permalink
    $render_content .= '<div class="newest-link">';
        $render_content .= '<a href="' . get_the_permalink() . '">';
            $render_content .= 'Přečíst Více';    
            $render_content .= $render_icon_arrow_right; 
        $render_content .= '</a>';
    $render_content .= '</div>';

$render_content .= '</div>'; // <-- newest-item

endwhile;
wp_reset_postdata();
wp_reset_query();

$render_content .= '</div>';

return $render_content;
?>
